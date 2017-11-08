
import { isFunction } from './common/util';
import Tracker from './tracker/tracker';
import actions from './actions/index';

let tracker;

export default function buzzi(...args) {
  try {
    const command = args[0];

    if (command === 'init') {
      tracker = new Tracker(...args.slice(1));
      tracker.init();
      return;
    }

    if (!tracker) {
      throw new Error('buzzi: "init" must be called first');
    }

    if (command === 'identify') {
      tracker.identify(...args.slice(1));
      return;
    }

    tracker.track(...args);

  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    return;
  }
}
