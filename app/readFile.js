import { readFileSync } from "fs";
import path from "path";

async function readFileContent(filePath, rootDir = null) {
  const file = path.join(rootDir ?? "", filePath);
  try {
    const content = await readFileSync(file, "utf8");
    return content;
  } catch (e) {
    return null;
  }
}

async function readJSON(filePath, rootDir = null) {
  const content = await readFileContent(filePath, rootDir);
  return JSON.parse(content);
}

async function readCSV(filePath, rootDir = null, parseFunc, header = false) {
  const content = await readFileContent(filePath, rootDir);
  const rows = content?.split("\r\n");
  const csvData = rows?.map((row) => row.split(","));
  if (!header) {
    return csvData.map((row) => row.map((value) => parseFunc(value)));
  }
  const head = csvData?.[0];
  const data = csvData?.slice(1);

  return data?.map((row) =>
    row.reduce((obj, value, i) => ({ ...obj, [head[i]]: parseFunc(value) }), {})
  );
}

async function readSimilarity(filePath, rootDir = null) {
  const content = await readFileContent(filePath, rootDir);
  const rows = content?.split("\r\n");
  const csvData = rows?.map((row) => row.split(","));
  const head = csvData?.[0];
  const data = csvData?.slice(1);

  return data?.map((row) =>
    row.reduce((obj, value, i) => {
      if (i === head.length - 1) {
        return { ...obj, [head[i]]: parseFloat(value) };
      } else {
        return { ...obj, [head[i]]: parseInt(value) };
      }
    }, {})
  );
}

export { readFileContent, readJSON, readCSV, readSimilarity };
