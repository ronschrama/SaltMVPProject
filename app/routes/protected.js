/**
 * API enpoint for Wallets
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

const Koa = require('koa');
const route = require('koa-router')();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const app = new Koa();

route.post('/', async (ctx) => {
  ctx.body = { data: [{ message: 'Protected route' }] };
});

app.use(route.routes());

module.exports = app;
