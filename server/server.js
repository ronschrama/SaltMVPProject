const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const pg = require('pg');

const app = new Koa();
const port = 5000;

app.use(bodyParser());
app.use(json());


if (!module.parent) {
  app.listen(port, () => console.log(`🚀 Server listening on port ${port}.`));
}

module.exports = {
  app,
};