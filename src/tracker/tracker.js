import uuid from 'uuid/v4';
import {
  isUuid,
  isPlainObject,
  isObject,
  isFunction,
  isEmail,
  isString,
} from 'common/util';
import * as browser from 'common/browser';
import Storage from './storage';
import Agent from './agent';
const actions = require('./actions');

export default class Tracker {


  constructor(tracker_id, site_id) {

    if (!tracker_id) throw new Error('buzzi.tracker: missing tracker_id');
    if (!isUuid(tracker_id)) throw new Error('buzzi.tracker: invalid tracker_id');

    this.tracker_id = tracker_id;
    this.site_id = site_id; // optional.

    this.storage = new Storage();
    this.agent = new Agent();
    this.actions = actions;

    // Initialize Cookies

    if (!isUuid(this.storage.getClientId())) {
      this.storage.setClientId(uuid());
    }

    if (!isUuid(this.storage.getSessionId())) {
      this.storage.setSessionId(uuid());
    }

  }


  init() {
    browser.getFingerprint(fingerprint => {
      this.agent.init(this.createPayload({
        browser: fingerprint,
      }));
    });
  }


  identify(email) {

    if (!isEmail(email)) {
      throw new Error('buzzi.identify: invalid email');
    }

    if (email === this.storage.getEmail()) {
      return;
    }

    this.storage.setEmail(email);

    this.agent.identify(this.createPayload());
  }


  track(action, ...args) {

    if (!isString(action)) {
      throw new Error('buzzi.track: missing action type');
    }

    let result, payload = this.createPayload();
    if (this.actions.hasOwnProperty(action)) {
      // Supported Events
      result = this.actions[action](...args)(payload);
    } else {
      // Custom Events
      if (isFunction(args[1])) {
        result = args[1](payload);
      } else if (isPlainObject(args[1])){
        result = { ...payload, ...args[1] };
      } else {
        throw new Error('buzzi.track: invalid custom event data');
      }
    }

    if (isPlainObject(result)) {
      payload = result;
    }

    this.agent.track(action, payload);
  }


  createPayload(arg) {

    const payload = {
      tracking_id: this.tracking_id,
      site_id: this.site_id,
      client_id: this.storage.getClientId(),
      session_id: this.storage.getSessionId(),
      email: this.storage.getEmail(),
      campaign_id: this.storage.getCampaignId(),
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
