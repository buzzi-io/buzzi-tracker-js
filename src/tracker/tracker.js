
import uuid from 'uuid/v4';
import { isUuid, isPlainObject, isFunction } from 'common/util';
import * as browser from 'common/browser';
import Storage from './storage';
import Agent from './agent';


export default class Tracker {

  constructor(tracker_id, name) {

    if (!tracker_id) throw new Error('buzzi.tracker: missing tracker_id');
    if (!isUuid(tracker_id)) throw new Error('buzzi.tracker: invalid tracker_id');

    this.tracker_id = tracker_id;
    this.name = name;

    this.storage = new Storage();
    this.agent = new Agent();

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

  createPayload(arg) {

    const payload = {
      tracking_id: this.tracking_id,
      client_id: this.storage.getClientId(),
      session_id: this.storage.getSessionId(),
      email: this.storage.getEmail(),
      campaign_id: this.storage.getCampaignId(),
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
