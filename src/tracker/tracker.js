
import uuid from 'uuid/v4';
import { isUuid } from 'common/util';
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

}
