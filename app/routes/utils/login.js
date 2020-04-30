const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const userAccounts = require('../../models/userAccounts');
// const log = require('../../utils/logger')();


const errorLevel = 'RUS';

function generateToken(user) {
  const { email } = user;
  const payload = { email };
  const signOptions = {
    issuer: 'PromoreSolution',
    subject: 'dev@promoresolution.com',
    audience: 'https://promoresolution.com',
    expiresIn: '7d',
    algorithm: 'RS256',
  };

  const privateKey = fs.readFileSync('./jwtkeys/jwt.key', 'utf8');
  const token = jwt.sign(payload, privateKey, signOptions);

  return token;
}


const login = async (ctx) => {
  const { email, password } = ctx.request.body;
  const account = await userAccounts.getUser(email, password);
  if (account.error) {
    ctx.body = account;
    return;
  }
  const token = generateToken({email});

  ctx.set('authorization', `Bearer ${token}`);
  ctx.cookies.set('authtoken', token, { path: '/' });

  ctx.body = { success: { code: 200, message: 'Logged in', token } };
};



module.exports = {
  login,
};
