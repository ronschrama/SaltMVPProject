/**
 * API enpoint for Wallets
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

const Koa = require('koa');
const route = require('koa-router')();
const { login } = require('./utils/login');


// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const app = new Koa();

route.post('/login', login);

app.use(route.routes());

module.exports = app;
