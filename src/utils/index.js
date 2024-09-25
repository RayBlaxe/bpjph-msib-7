export const serialize = (obj) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

export const getQuery = (value) => {
  return JSON.parse(
    '{"' +
      decodeURI(value)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
};

export const normalizeUrl = (url) => {
  if (url) {
    const Url = String(url);
    if (!Url.includes(process.env.API_URL)) {
      const newUrl = url.replace(
        /(http:|)(^|\/\/)(.*?\/)/g,
        `${process.env.API_URL}/`
      );
      return newUrl;
    } else {
      return url;
    }
  }
};
