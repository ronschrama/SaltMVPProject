const Router = require('koa-router');
const validator = require('validator');
const fetch = require('node-fetch');

const router = new Router();

router.post('/login', async (ctx) => {
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
      ctx.status = 200;
      ctx.body = {
        "status": "success",
        "message": "Logged in"
      };
    }
  }
});

module.exports = router;

//  && person.password === password