/**
 * API enpoint for creating/deleting user
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

const Koa = require('koa');
const route = require('koa-router')();
const log = require('../utils/logger')('RUS');
const userAccounts = require('../models/userAccounts');

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const app = new Koa();

const errorLevel = 'RUS';


route.post('/newuser', async (ctx) => {
  const { email, password } = ctx.request.body;

  const createdAccount = await userAccounts.create({ email, password });

  if (createdAccount.error) {
    ctx.body = createdAccount;
    return;
  }

  ctx.body = {data: 'User created successfully.'};
});


route.delete('/remove', async (ctx) => {
  const { email } = ctx.request.body;
  const account = await userAccounts.delete(email);

  ctx.body = account;
});


app.use(route.routes());

module.exports = app;
