
export function getCurrentPageUrl() {
  return window.location.href;
}

export function getDomain() {
  return window.location.href.replace(/(http(s)?:\/\/)|(\/.*){1}/g, '');
}

export function getReferrer() {
  return document.referrer;
}
