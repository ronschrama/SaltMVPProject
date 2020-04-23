const Router = require('koa-router');
const { login, isAuthorized } = require('../views/login');


const router = new Router();


router.post('/login', login);


router.get('/protected', isAuthorized, async (ctx) => {
  ctx.body = 'Super secret testing route. :)';
});


module.exports = router;
