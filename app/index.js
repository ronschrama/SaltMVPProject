/**
 * Application entrypoint for API
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

const Koa = require('koa');
const mount = require('koa-mount');
const route = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const serve = require('koa-static');
const cors = require('@koa/cors');

const log = require('./utils/logger')('app', 'INFO');

// const modelsInit = require('./models');
const routes = require('./routes');

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const app = new Koa();

// -----------------------------------------------------------------------------
// Error handling for exceptions
// -----------------------------------------------------------------------------

app.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) ctx.throw(404);
  } catch (err) {
    ctx.status = 200;
    let code = '500ARE00';
    switch (err.status) {
      case 401:
        code = '401ARE00';
        ctx.body = {
          error: { message: 'Invalid/Expired token or login/password pair', code },
        };
        // log.warn(`401 exception in middleware: ${err.message || err} (${err.code})`);
        break;
      case 403:
        code = '403ARE00';
        ctx.body = { error: { message: 'You have no permission to do this', code } };
        log.warn(`403 exception in middleware: ${err.message || err} (${err.code})`);
        break;
      case 404:
        code = '404ARE00';
        ctx.body = { error: { message: 'Endpoint does not exists', code } };
        log.warn(`404 exception in middleware: ${err.message || err} (${err.code})`);
        break;
      case 405:
        code = '405ARE00';
        ctx.body = { error: { message: 'This action is blocked for you', code } };
        log.warn(`405 exception in middleware: ${err.message || err} (${err.code})`);
        break;
      case 502:
        code = '502ARE00';
        ctx.body = { error: { message: 'Unable to obtain origin of request', code } };
        log.warn(`502 exception in middleware: ${err.message || err} (${err.code})`);
        break;
      default:
        ctx.body = { error: { message: 'Internal server error', code } };
        log.error({
          error: {
            message: `UNHANDLED exception in middleware: ${err.message || err} (${err.code})`,
            code: err.code,
            stack: err.stack,
          },
        });
    }
  }
});

// -----------------------------------------------------------------------------
// Async app launch to be sure that all initialization is done
// -----------------------------------------------------------------------------

(async () => {
  // const modelsInitialized = await modelsInit();
  // if (modelsInitialized.error) {
  //   log.error('Error occuried during models initialization, app initialization aborted');
  // } else {
  // ---------------------------------------------------------------------------
  // Mount endpoints and init app
  // ---------------------------------------------------------------------------

  app.use(serve('./public'));
  app.use(cors({credentials: true}));
  app.use(bodyParser());
  app.use(json());

  app.use(route.routes());
  app.use(mount('/', routes));

  const server = app.listen(process.env.PORT || 5000);
  log.info(`App launched on PORT ${process.env.PORT || 5000}`);

  // ---------------------------------------------------------------------------
  // Quit handlers
  // ---------------------------------------------------------------------------

  function shutdown(serverToShutdown) {
    if (serverToShutdown === undefined || serverToShutdown.close === undefined) {
      log.error('Server for shutdown is undefined or missing close method');
    }
    serverToShutdown.close((err) => {
      if (err) {
        log.error({
          message: err.message || 'Server shutdown error!',
          code: err.code || '500ASD00',
        });
        process.exitCode = 1;
      }
      process.exit();
    });
  }

  process.on('SIGINT', () => {
    log.info('SIGINT received, graceful shutdown started');
    shutdown(server);
  });

  process.on('SIGTERM', () => {
    log.info('SIGTERM received, graceful shutdown started');
    shutdown(server);
  });
  // }
})();

process.on('uncaughtException', (err) => {
  log.error({
    error: {
      message: `UNHANDLED exception in process, process will exit now:  ${err.message}`,
      stack: err.stack,
    },
  });
  process.exitCode = 1;
  process.exit(1);
});

// Needed to be replaced with process exit after warning on NodeJS
// will became an error
process.on('unhandledRejection', (err) => {
  log.error({
    error: {
      message: `UNHANDLED rejection in process: ${err.message}`,
      stack: err.stack,
    },
  });
});
