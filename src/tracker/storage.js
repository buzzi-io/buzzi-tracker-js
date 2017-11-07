
import storage from 'js-cookie';

const KEY = Object.freeze({
  CONTACT: 'contactid',
  SESSION: 'sessionid',
  EMAIL: 'email',
  CAMPAIGN: 'campaignid',
});

export default class TrackerStorage {

  getContactId() {
    return storage.get(KEY.CONTACT);
  }

  setContactId(id) {
    storage.set(KEY.CONTACT, id, { expires: 365 * 10 }); // 10 years
  }

  getSessionId() {
    return storage.get(KEY.SESSION);
  }

  setSessionId(id) {
    storage.set(KEY.SESSION, id, { expires: 1 }); // 1 day
  }

  getEmail() {
    return storage.get(KEY.EMAIL);
  }

  setEmail(email) {
    storage.set(KEY.EMAIL, email);
  }

  getCampaignId() {
    return storage.get(KEY.CAMPAIGN);
  }

  setCampaignId(id) {
    storage.set(KEY.CAMPAIGN, id);
  }

  getCurrentPageUrl() {
    return window.location.href;
  }

  getDomain() {
    return window.location.href.replace(/(http(s)?:\/\/)|(\/.*){1}/g, '');
  }

  getReferrer() {
    return document.referrer;
  }

}
