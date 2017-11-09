
import { isUrl } from 'common/util';
import { getCurrentPageUrl } from 'common/browser';


export default url => createPayload => (
  createPayload(payload => {
    payload.url = isUrl(url) ? url : getCurrentPageUrl();
  })
);
