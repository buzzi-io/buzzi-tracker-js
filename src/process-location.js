
import storage from './tracker/storage';
import { isUuid, isEmail, isString } from './common/util';
const url = require('url');

exports = module.exports = function processUrl(href) {

  const { query } = url.parse(href, true);

  const clientid = query.client_id || query.cid;
  const campaignid = query.campaign_id || query.cmid;
  const email = query.email;

  if (isUuid(clientid)) storage.setClientId(clientid);
  if (isString(campaignid)) storage.setCampaignId(campaignid);
  if (isEmail(email)) storage.setEmail(email);

};
