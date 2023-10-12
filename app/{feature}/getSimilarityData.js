import path from "path";
import { readJSON, readSimilarity } from "@/app/readFile";

async function getNodesData() {
  const jsonDir = path.join(process.cwd(), "public", "json");
  const musicListPath = path.join(jsonDir, "detail");
  const musicList = await readJSON("data.json", musicListPath);
  const nodes = musicList.map(({ id, name, videoid }) => {
    return {
      id: name,
      musicId: id,
      musicName: name,
      videoId: videoid,
    };
  });

  return nodes;
}

async function getLinksDataFromID(id, id2name, topN = 10) {
  const csvDir = path.join(process.cwd(), "public", "csv");
  const musicSimilarityPath = path.join(csvDir, "sims");
  const similarities = await readSimilarity(
    `similarities_${id}.csv`,
    musicSimilarityPath
  );

  similarities.sort((a, b) => {
    return b.similarity - a.similarity;
  });
  const similaritiesSlice = similarities.slice(0, topN);

  const links = similaritiesSlice.map(({ source, target, similarity }) => {
    return {
      source: id2name[source],
      target: id2name[target],
      value: similarity,
    };
  });

  return links;
}

async function getLinksData(ids, id2name, topN = 10) {
  const linksPromise = ids.map(async (id) => {
    const links = await getLinksDataFromID(id, id2name, topN);
    return links;
  });

  const links = await Promise.all(linksPromise);

  return links.flat();
}

async function getSimilarityData(topN = 10) {
  const nodes = await getNodesData();
  const ids = nodes.map(({ musicId }) => musicId);
  const id2name = nodes.reduce((acc, { musicId, musicName }) => {
    acc[musicId] = musicName;
    return acc;
  }, {});
  const name2id = nodes.reduce((acc, { musicId, musicName }) => {
    acc[musicName] = musicId;
    return acc;
  }, {});

  const links = await getLinksData(ids, id2name, topN);

  return { nodes, links, id2name, name2id };
}

export default getSimilarityData;
