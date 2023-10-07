const SHA_REGEX = /(blobs|manifests)\/sha256:[a-f0-9]+$/;

const getSha256 = (method, url) => {
  if (method !== 'GET') {
    return;
  }
  const parts = SHA_REGEX.exec(url);
  if (!parts || !parts[0]) {
    return;
  }
  return parts[0];
};

export const getFromCache = (method, url) => {
  const sha256 = getSha256(method, url);
  if (!sha256) {
    return;
  }
  try {
    return {
      responseText: sessionStorage.getItem(`${sha256}/responseText`),
      dockerContentdigest: sessionStorage.getItem(`${sha256}/dockerContentdigest`),
    };
  } catch (e) {}
};

export const setCache = (method, url, { responseText, dockerContentdigest }) => {
  const sha256 = getSha256(method, url);
  if (!sha256) {
    return;
  }
  try {
    sessionStorage.setItem(`${sha256}/responseText`, responseText);
    sessionStorage.setItem(`${sha256}/dockerContentdigest`, dockerContentdigest);
  } catch (e) {}
};
