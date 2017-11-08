import uuid from 'uuid/v4';
import {
  isUuid,
  isPlainObject,
  isFunction,
  isEmail,
  isString,
} from 'common/util';
import * as browser from 'common/browser';
import Storage from './storage';
import Agent from './agent';
import * as actions from './actions/index';

export default class Tracker {


  constructor(tracker_id, name) {

    if (!tracker_id) throw new Error('buzzi.tracker: missing tracker_id');
    if (!isUuid(tracker_id)) throw new Error('buzzi.tracker: invalid tracker_id');

    this.tracker_id = tracker_id;
    this.name = name;

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

    if (!this.actions.hasOwnProperty(action) || !isFunction(this.actions[action])) {
      throw new Error('buzzi.track: invalid action type');
    }

    const result = this.actions[action](...args)(this.createPayload.bind(this));

    if (!isPlainObject(result)) {
      throw new Error('buzzi.track: invalid payload');
    }

    result.action = action;

    this.agent.track(result);
  }


  createPayload(action, arg) {

    const payload = {
      tracking_id: this.tracking_id,
      client_id: this.storage.getClientId(),
      session_id: this.storage.getSessionId(),
      email: this.storage.getEmail(),
      campaign_id: this.storage.getCampaignId(),
      url: browser.getCurrentPageUrl(),
      domain: browser.getDomain(),
      referrer: browser.getReferrer(),
    };

    if (isString(action)) {
      payload.action = action;
    } else {
      arg = action;
    }

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
