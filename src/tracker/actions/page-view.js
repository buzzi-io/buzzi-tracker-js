
import { getCurrentPageUrl } from 'common/browser';

export default () => createPayload => (
  createPayload(payload => {
    payload.url = getCurrentPageUrl();
  })
);
