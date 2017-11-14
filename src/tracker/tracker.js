import uuid from 'uuid/v4';
import {
  isUuid,
  isPlainObject,
  isFunction,
  isEmail,
  isString,
} from 'common/util';
import * as browser from 'common/browser';
import actions from './actions';
import storage from './storage';
import agent from './agent';

export default class Tracker {


  constructor(tracking_id, site_id) {

    if (!tracking_id) throw new Error('buzzi.tracker: missing tracking_id');
    if (!isUuid(tracking_id)) throw new Error('buzzi.tracker: invalid tracking_id');

    this.tracking_id = tracking_id;
    this.site_id = site_id; // optional.

  }


  init() {

    // Initialize Cookies

    const query = browser.getCurrentQueryParams();

    const clientid = query.client_id || query.cid;
    const campaignid = query.campaign_id || query.cmid;
    const email = query.email;

    if (isUuid(clientid)) storage.setClientId(clientid);
    if (isString(campaignid)) storage.setCampaignId(campaignid);
    if (isEmail(email)) storage.setEmail(email);

    if (!isUuid(storage.getClientId())) {
      storage.setClientId(uuid());
    }

    if (!isUuid(storage.getSessionId())) {
      storage.setSessionId(uuid());
    }

    // Send Browser Information

    browser.getFingerprint(fingerprint => {
      agent.init(this.createPayload({
        browser: fingerprint,
      }));
    });
  }


  identify(email) {

    if (!isEmail(email)) {
      throw new Error('buzzi.identify: invalid email');
    }

    if (email === storage.getEmail()) {
      return;
    }

    storage.setEmail(email);

    agent.identify(this.createPayload());
  }


  track(action, ...args) {

    if (!isString(action)) {
      throw new Error('buzzi.track: missing action type');
    }

    let result, payload = this.createPayload();
    if (actions.hasOwnProperty(action)) {
      // Supported Events
      result = actions[action](...args)(payload);
    } else {
      // Custom Events
      if (isFunction(args[1])) {
        result = args[1](payload);
      } else if (isPlainObject(args[1])){
        result = { ...payload, ...args[1] };
      } else {
        console.warn('buzzi.track: custom event data was not a plain object - tracking event without it');
      }
    }

    if (isPlainObject(result)) {
      payload = result;
    }

    agent.track(action, payload);
  }


  createPayload(arg) {

    const payload = {
      tracking_id: this.tracking_id,
      site_id: this.site_id,
      client_id: storage.getClientId(),
      session_id: storage.getSessionId(),
      email: storage.getEmail(),
      campaign_id: storage.getCampaignId(),
      url: browser.getCurrentPageUrl(),
      domain: browser.getDomain(),
      referrer: browser.getReferrer(),
    };

    if (isPlainObject(arg)) {
      return Object.assign(payload, arg);
    }

    if (isFunction(arg)) {
      const result = arg(payload);
      return isPlainObject(result)
        ? result
        : payload;
    }

    return payload;
  }

}
