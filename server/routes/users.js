const Router = require('koa-router');

const router = new Router();


router.get('/login', async (ctx) => {
  ctx.status = 200;
  ctx.body = 'Hello!';
});

module.exports = router; 