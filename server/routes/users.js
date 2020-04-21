const Router = require('koa-router');
const validator = require('validator');
const fetch = require('node-fetch');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const router = new Router();

router.post('/login', isAuthorized, async (ctx) => {
  const { email, password } = ctx.request.body;
  let data = await fetch('http://localhost:5000/DB.json');
  data = await data.json();
  const user = data.find((person) => person.email === email);


  if (typeof user === 'undefined') {
    ctx.status = 403;
    ctx.body = {
      "status": "error",
      "message": "Incorrect email address"
    };
  } else {
    if (user.password !== password) {
      ctx.status = 403;
      ctx.body = {
        "status": "error",
        "message": "Incorrect password"
      };
    } else {
      let token = await fetch('http://localhost:5000/jwt', {
        method: 'POST',
        body: { email }
      });
      token = await token.json();
      ctx.cookies.set('authtoken', token);
      ctx.status = 200;
      ctx.body = {
        "status": "success",
        "message": "Logged in"
      };
    }
  }
});

router.post('/jwt', async (ctx) => {
  const { email } = ctx.request.body;
  let privateKey = fs.readFileSync('./private.pem', 'utf8');
  let token = jwt.sign({ email }, privateKey, { algorithm: "HS256" });
  ctx.body = JSON.stringify(token);
});

router.get('/protected', isAuthorized, async (ctx) => {
  ctx.body = "super secret route";
});

function isAuthorized(ctx, next) {
  const authToken = ctx.cookies.get('authtoken');
  if (typeof authToken !== 'undefined') {
    let privateKey = fs.readFileSync('./private.pem', 'utf8');

    jwt.verify(authToken, privateKey, { algorithm: "HS256" }, async (err, decoded) => {
      if (err) {
        ctx.status = 500;
        ctx.body = { "error": "Not Authorized" };
      }
      console.log(decoded);

      return await next();
    });
  } else {
    ctx.status = 500;
    ctx.body = { "error": "Not Authorized" };
  }
}

module.exports = router;
