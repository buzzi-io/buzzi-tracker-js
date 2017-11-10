
import storage from 'js-cookie';

const KEY = Object.freeze({
  CLIENT: 'client',
  SESSION: 'session',
  EMAIL: 'email',
  CAMPAIGN: 'campaign',
});

export class Storage {

  // Getter Methods

  getClientId() {
    return storage.get(KEY.CLIENT);
  }

  getSessionId() {
    return storage.get(KEY.SESSION);
  }

  getEmail() {
    return storage.get(KEY.EMAIL);
  }

  getCampaignId() {
    return storage.get(KEY.CAMPAIGN);
  }

  // Setter Methods

  setClientId(id) {
    storage.set(KEY.CLIENT, id, { expires: 365 * 10 }); // 10 years
  }

  setSessionId(id) {
    storage.set(KEY.SESSION, id, { expires: 1 }); // 1 day
  }

  setEmail(email) {
    storage.set(KEY.EMAIL, email);
  }

  setCampaignId(id) {
    storage.set(KEY.CAMPAIGN, id);
  }

  // Clear Methods

  clear(...args) {

    if (args.length === 0) {
      return this.clearAll();
    }

    args.forEach(arg => {
      switch (arg) {
        case 'session': return this.clearSessionId();
        case 'email': return this.clearEmail();
        case 'client': return this.clearClientId();
        case 'campaign': return this.clearCampaignId();
        default: return;
      }
    });
  }

  clearAll() {
    this.clearClientId();
    this.clearEmail();
    this.clearSessionId();
    this.clearCampaignId();
  }

  clearClientId() {
    storage.remove(KEY.CLIENT);
  }

  clearEmail() {
    storage.remove(KEY.EMAIL);
  }

  clearSessionId() {
    storage.remove(KEY.SESSION);
  }

  clearCampaignId() {
    storage.remove(KEY.CAMPAIGN);
  }

}

export default new Storage();
