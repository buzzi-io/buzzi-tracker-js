
import buzzi from './buzzi';

const namespace = window['BuzziTrackingObject'] || 'buzzi';
const snippet = window[namespace];

if (snippet && Array.isArray(snippet.q)) {
  snippet.q.forEach(args => buzzi.apply(null, args)); // eslint-disable-line prefer-spread
}

global[namespace] = buzzi;
export default buzzi;
