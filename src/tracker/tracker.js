
import uuid from 'uuid/v4';
import Storage from './storage';
import Agent from './agent';


export default class Tracker {

  constructor() {
    this.storage = new Storage();
    this.agent = new Agent();
  }

}
