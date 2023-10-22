function hiraToKana(str) {
  return str.replace(/[\u3041-\u3096]/g, function (match) {
    var chr = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(chr);
  });
}

export default function searchFilter(data, str) {
  const searchStr = str.trim().toLowerCase().replace(/\s+/g, "");
  return searchStr == ""
    ? []
    : data.filter(({ name, ruby }) => {
        const searchName = name.trim().toLowerCase().replace(/\s+/g, "");
        const searchRuby = ruby?.trim().toLowerCase().replace(/\s+/g, "");
        const matchName = searchName.indexOf(searchStr) !== -1;
        const matchRuby =
          searchRuby &&
          hiraToKana(searchRuby).indexOf(hiraToKana(searchStr)) !== -1;

        return matchName || matchRuby;
      });
}
