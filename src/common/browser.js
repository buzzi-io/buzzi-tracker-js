
const Fingerprint = require('fingerprintjs2');
const url = require('url');

const set = (o, k, v) => {
  o[k] = v;
  return o;
};

let cachedFingerprint;

export function getFingerprint(callback) {

  if (typeof callback !== 'function') {
    throw new Error('browser.fingerprint: missing callback');
  }

  if (cachedFingerprint) {
    callback({ ...cachedFingerprint });
    return;
  }

  new Fingerprint().get((hash, components) => {

    cachedFingerprint = components.reduce(
      (result, { key, value }) => set(result, key, value),
      { hash }
    );

    callback({ ...cachedFingerprint });
  });
}

export function getCurrentPageUrl() {
  return window.location.href;
}

export function getDomain() {
  return window.location.href.replace(/(http(s)?:\/\/)|(\/.*){1}/g, '');
}

export function getReferrer() {
  return document.referrer;
}

export function getCurrentQueryParams() {
  return url.parse(window.location.href, true).query;
}
