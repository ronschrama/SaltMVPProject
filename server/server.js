const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const serve = require('koa-static');
const users = require('./routes/users');
const cors = require('@koa/cors');

const app = new Koa();
const port = 5000;

app.use(serve('./public'));
app.use(cors());
app.use(bodyParser());
app.use(json());


app.use(users.routes());


if (!module.parent) {
  app.listen(port, () => console.log(`🚀 Server listening on port ${port}.`));
}


module.exports = {
  app,
};
