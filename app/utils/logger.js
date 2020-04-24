/**
 * Setup logging utilities
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

const loglevel = require('loglevel');
const axios = require('axios');

const errorLevel = 'ULO';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const colors = {
  trace: '',
  debug: '\x1b[97m',
  info: '\x1b[94m',
  warn: '\x1b[93m',
  error: '\x1b[91m',
};

const originalFactory = loglevel.methodFactory;
loglevel.methodFactory = (methodName, logLevel, loggerName) => {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);

  return (message) => {
    // Getting stacktrace
    const err = new Error();
    const callerLine = err.stack.split('\n')[2];
    let invokeLocation = callerLine.match(/\(\/.*\)/);
    if (invokeLocation) {
      // Removing () brackets around line and replace core folder
      // where app is stored inside Docker container
      invokeLocation = invokeLocation[0].slice(1, -1).replace('/opt/app', '');
    } else {
      invokeLocation = '';
    }

    let prefix = '';

    if (process.env.NODE_ENV === 'development') {
      prefix = `${colors[methodName]}[${new Date()
        .toTimeString()
        .replace(
          /.*(\d{2}:\d{2}:\d{2}).*/,
          '$1',
        )}] ${methodName.toUpperCase()}(${loggerName})[${invokeLocation}]:\x1b[0m`;
    } else {
      prefix = `${methodName.toUpperCase()}(${loggerName})[${invokeLocation}]:`;
    }

    if (message === undefined) {
      return rawMethod(prefix, message);
    }
    let formattedMessage = message;

    if (message.stack && process.env.NODE_ENV === 'production') {
      formattedMessage = `${message.stack.replace(/\n/g, '')}`;
    }

    if (methodName === 'error') {
      let errorObject = message.error || message;
      if (typeof errorObject === 'string' || errorObject instanceof String) {
        formattedMessage = errorObject;
      } else {
        const stackWithoutMessage = (errorObject.stack
          && errorObject.stack
            .split('\n')
            .slice(1)
            .join('\n')
        ) || '';
        const stack = process.env.NODE_ENV === 'production'
          ? stackWithoutMessage.replace(/\n/g, '')
          : `\n${stackWithoutMessage}`;
        if (errorObject instanceof Error) {
          // In case someone stringifyed error object as you can in Bull queue
          try {
            errorObject = JSON.parse(errorObject.message);
            errorObject = errorObject.error || errorObject;
            // eslint-disable-next-line no-empty
          } catch (e) { }
        }
        formattedMessage = `${errorObject.message} (${errorObject.code || 0}) ${stack}`;
      }
    }

    return rawMethod(prefix, formattedMessage);
  };
};
// Call setLevel to apply plugin for method factory above
loglevel.setLevel(loglevel.getLevel());

const internalLogger = loglevel.getLogger('Logger');

const logToSlack = (data, webhookLink) => {
  if (process.env.NODE_ENV === 'production') {
    try {
      axios.post(
        webhookLink,
        typeof data === 'string'
          ? {
            text: data,
          }
          : { ...data },
      );
    } catch (err) {
      internalLogger.error({
        error: {
          message: `Failed to send alert ${data} (${err.message})`,
          code: err.code || `500${errorLevel}00`,
        },
      });
    }
  } else {
    internalLogger.debug(
      `Logging to slack is skipped because of non-production ENV: ${JSON.stringify(data)}`,
    );
  }
};

module.exports = (name = 'general', level) => {
  const newLogger = loglevel.getLogger(name);
  if (level === undefined) {
    if (process.env.NODE_ENV === 'development') {
      newLogger.setLevel(loglevel.levels.DEBUG);
    }
    if (process.env.NODE_ENV === 'production') {
      newLogger.setLevel(loglevel.levels.INFO);
    }
    if (process.env.NODE_ENV === 'test') {
      newLogger.setLevel(loglevel.levels.SILENT);
    }
  } else {
    newLogger.setLevel(level);
  }

  return { slack: logToSlack, ...newLogger };
};
