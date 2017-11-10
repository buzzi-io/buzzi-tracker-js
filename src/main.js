
import buzzi from './buzzi';

// @TODO: Process Query String Parameters (email, campaign_id, client_id).

const namespace = window['BuzziTrackingObject'] || 'buzzi';
const snippet = window[namespace];

if (snippet && Array.isArray(snippet.q)) {
  snippet.q.forEach(args => buzzi.apply(null, args)); // eslint-disable-line prefer-spread
}

exports = module.exports = buzzi;
