function hiraToKana(str) {
  return str.replace(/[\u3041-\u3096]/g, function (match) {
    var chr = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(chr);
  });
}

export default function searchFilter(data, searchStr) {
  return searchStr == ""
    ? []
    : data.filter(
        ({ name, ruby }) =>
          name.indexOf(searchStr) !== -1 ||
          hiraToKana(ruby).indexOf(hiraToKana(searchStr)) !== -1
      );
}
