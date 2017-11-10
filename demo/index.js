'use strict';

const Koa = require('koa');
const serve = require('koa-static');
const mount = require('koa-mount');
const send = require('koa-send');
const path = require('path');


const app = new Koa();

app.use(mount('/api', async ctx => {
  ctx.body = null;
  ctx.status = 204;
}));

app.use(serve(`${__dirname}/static`));

app.listen(3000);

console.log('Server started at https://127.0.0.1:3000');
