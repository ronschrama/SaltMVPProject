const Router = require('koa-router');
const validator = require('validator');
const fetch = require('node-fetch');

const router = new Router();

router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body;
  let data = await fetch('http://localhost:5000/DB.json');
  data = await data.json();
  const user = data.find((person) => person.email === email && person.password === password);
  ctx.status = 200;
  ctx.body = 'Hello!';
});

module.exports = router;