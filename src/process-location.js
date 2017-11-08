
import storage from './tracker/storage';
import { isUuid, isEmail, isString } from './common/util';
const { URL } = require('url'); // https://nodejs.org/docs/latest-v8.x/api/url.html

exports = module.exports = function processUrl(url) {

  const params = (new URL(url)).searchParams;

  const clientid = params.get('client_id') || params.get('cid');
  const campaignid = params.get('campaign_id') || params.get('cmid');
  const email = params.get('email');

  if (isUuid(clientid)) storage.setClientId(clientid);
  if (isString(campaignid)) storage.setCampaignId(campaignid);
  if (isEmail(email)) storage.setEmail(email);

};
