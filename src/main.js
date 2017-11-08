
import buzzi from './buzzi';

require('process-location')(window.location.href);

// @TODO: Process Query String Parameters (email, campaign_id, client_id).

const namespace = window['BuzziTrackingObject'] || 'buzzi';
const snippet = window[namespace];

if (snippet && Array.isArray(snippet.q)) {
  snippet.q.forEach(args => buzzi.apply(null, args)); // eslint-disable-line prefer-spread
}

global[namespace] = buzzi;
export default buzzi;
