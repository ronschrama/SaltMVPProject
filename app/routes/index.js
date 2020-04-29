/**
 * Mount point for all API routes
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

const Koa = require('koa');
const mount = require('koa-mount');
const jwt = require('koa-jwt');
const fs = require('fs');

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const app = new Koa();
const publicKey = fs.readFileSync('./jwtkeys/jwt.pub', 'utf8');

// Routes under JWT middleware are private
app.use(jwt({
  secret: publicKey,
  algorithm: 'RS256',
}));

app.use(mount('/user', require('./user')));
app.use(mount('/file', require('./file')));
app.use(mount('/protected', require('./protected')));

module.exports = app;
