
import Tracker from './tracker/tracker';
import storage from './tracker/storage';

let tracker;

export default function buzzi(...args) {
  try {
    const command = args[0];

    if (command === 'init') {
      if (!tracker) {
        tracker = new Tracker(...args.slice(1));
      }
      tracker.init();
      return;
    }

    if (!tracker) {
      throw new Error('buzzi: "init" must be called first');
    }

    if (command === 'clear') {
      storage.clear(...args.slice(1));
      return;
    }

    if (command === 'reinit') {
      storage.clear(...args.slice(1));
      tracker.init();
      return;
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
