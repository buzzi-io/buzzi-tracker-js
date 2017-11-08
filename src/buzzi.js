
import Tracker from './tracker/tracker';

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

    switch (command) {
      default: return;
    }

  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    return;
  }
}
