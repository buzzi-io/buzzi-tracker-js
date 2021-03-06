import { apiUrl as BASEURL } from 'common/config';

export class Agent {

  constructor(baseurl = BASEURL) {
    this.baseurl = baseurl;
  }

  init(data) {
    this.send('/init', data);
  }

  identify(data) {
    this.send('/identify', data);
  }

  track(action, data) {
    this.send(`/track/${action}`, data);
  }

  send(url, data) {
    send(this.baseurl + url, data);
  }

}

export default new Agent();

// ---

function send(url, data) {

  let xmlhttp;
  if (window.XDomainRequest) {
    xmlhttp = new window.XDomainRequest();
  } else if (window.XMLHttpRequest) {
    xmlhttp = new window.XMLHttpRequest();
  } else {
    xmlhttp = new window.ActiveXObject('Microsoft.XMLHTTP');
  }

  xmlhttp.open('POST', url, true);
  xmlhttp.setRequestHeader('Accept', 'application/json');
  xmlhttp.setRequestHeader('Content-Type', 'application/json');
  xmlhttp.send(JSON.stringify(data));
}
