/**
 * Mount point for all API routes
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

const Koa = require('koa');
const mount = require('koa-mount');

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const app = new Koa();


app.use(mount('/user', require('./user')));
app.use(mount('/file', require('./file')));
app.use(mount('/protected', require('./protected')));

module.exports = app;
