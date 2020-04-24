/**
 * API enpoint for Wallets
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

const Koa = require('koa');
const route = require('koa-router')();
const { isAuthorized } = require('./utils/login');

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const app = new Koa();

route.post('/', isAuthorized, async (ctx) => {
  ctx.body = { data: [{ message: 'Protected route' }] };
});

app.use(route.routes());

module.exports = app;
