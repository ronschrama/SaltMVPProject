const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
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


function isAuthorized(ctx, next) {
  const authToken = ctx.cookies.get('authtoken');

  if (typeof authToken !== 'undefined') {
    const cert = fs.readFileSync('./jwtkeys/jwt.pub', 'utf8');

    jwt.verify(authToken, cert, { algorithms: ['RS256'] }, async (err) => {
      if (err) {
        ctx.body = { error: { code: `403${errorLevel}03`, message: 'Not Authorized' } };
      }

      return next();
    });
  } else {
    ctx.body = { error: { code: `403${errorLevel}04`, message: 'Not Authorized' } };
  }
}


const login = async (ctx) => {
  const { email, password } = ctx.request.body;
  let data = await fetch('http://localhost:5000/DB.json');
  data = await data.json();
  const user = data.find((person) => person.email === email);


  if (typeof user === 'undefined') {
    ctx.body = { error: { code: `403${errorLevel}01`, message: 'Incorrect email address' } };
  } else {
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      ctx.body = { error: { code: `403${errorLevel}02`, message: 'Incorrect password ' } };
    } else {
      const token = generateToken(user);

      ctx.set('authtoken', token);
      ctx.cookies.set('authtoken', token, { path: '/' });

      ctx.body = { success: { code: 200, message: 'Logged in', token } };
    }
  }
};

module.exports = {
  login,
  isAuthorized,
};
