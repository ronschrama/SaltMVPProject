/**
 * Initialization for all models
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

// const fs = require('fs').promises;

const database = require('./connectors/postgres');

const Events = require('./Events');
const UserAccounts = require('./userAccounts');

const log = require('../utils/logger')('models', 'DEBUG');

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const init = async () => {
  const modelsToInit = {
    Events,
    UserAccounts
  };

  const databaseCreated = await database.createDatabase();
  if (databaseCreated.error) {
    return databaseCreated;
  }
  log.debug('Database ready');
  // eslint-disable-next-line
  for (const model of Object.keys(modelsToInit)) {
    const initializationResult = await modelsToInit[model].init();
    if (initializationResult.error) {
      return initializationResult;
    }
    log.debug(`Model ${model} is ready`);
  }

  return { data: modelsToInit };
};

module.exports = init;
