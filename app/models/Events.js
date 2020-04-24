/**
 * Model for Statuses
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

const genUuid = require('uuid/v4');

const log = require('../utils/logger')('Events');

const database = require('./connectors/postgres');

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

const Model = {
  name: 'Events',
  errorLevel: 'MEV',
  defaultStatus: {
    type: 'ok',
    message: 'All is working as expected',
  },
};

Model.init = async () => {
  log.debug(`Initializing ${Model.name} model`);

  const query = {
    text: `
      CREATE TABLE IF NOT EXISTS Events (
        "euid"          TEXT PRIMARY KEY,
        "title"         TEXT NOT NULL,
        "description"   TEXT,
        "startAt"       TIMESTAMP NOT NULL
      )
    `,
  };

  const createdTable = await database.query(query);
  if (createdTable.error) {
    log.error(createdTable);
  }
  return createdTable;
};

Model.create = async (title, startAt, { description } = {}) => {
  const missingParams = Object.entries({ title, startAt }).filter(
    item => item[1] === undefined,
  );
  if (missingParams.length !== 0) {
    return {
      error: {
        code: `400${Model.errorLevel}00`,
        message: `Required params missing: ${missingParams.map(item => item[0])}`,
      },
    };
  }

  const query = {
    text: `
      INSERT INTO Events
      (
        "euid",
        "title",
        "description",
        "startAt"     
      )
      VALUES (
        :euid,        
        :title,
        :description,
        :startAt
      )
      RETURNING *
    `,
    values: {
      euid: genUuid(),
      title,
      description,
      startAt
    },
  };

  return await database.query(query);
};

Model.get = async ({ type, startAt, endAt } = {}) => {
  const query = {
    text: `
      SELECT *
      FROM Statuses
      WHERE TRUE
      ${type ? 'AND "type" = :type' : ''}
      ${startAt ? 'AND "startAt" >= :startAt' : ''}
      ${endAt ? 'AND "endAt" <= :endAt' : ''}
    `,
    values: {
      type,
      startAt,
      endAt,
    },
  };
  return database.query(query);
};

Model.update = async (
  type,
  startAt,
  endAt,
  { newStartAt, newEndAt, message, description, restrictions } = {},
) => {
  const missingParams = Object.entries({ type, startAt, endAt }).filter(
    item => item[1] === undefined,
  );
  if (missingParams.length !== 0) {
    return {
      error: {
        code: `400${Model.errorLevel}01`,
        message: `Required params missing: ${missingParams.map(item => item[0])}`,
      },
    };
  }

  if (
    [newStartAt, newEndAt, message, description, restrictions].every(item => item === undefined)
  ) {
    return {
      error: { message: 'Empty or update with unsupported params passed, skip', code: 400 },
    };
  }

  const query = {
    text: `
      UPDATE Statuses
      SET "type" = :type
          ${newStartAt ? ',"startAt" = :newStartAt' : ''}
          ${newEndAt ? ',"endAt" = :newEndAt' : ''}
          ${description ? ',"description" = :description' : ''}
          ${message ? ',"message" = :message' : ''}
          ${restrictions ? ',"iconUrl" = :iconUrl' : ''}
          ,"updatedAt" = LOCALTIMESTAMP
      WHERE "type" = :type
        AND "startAt" = :startAt
        AND "endAt" = :endAt
      RETURNING *
    `,
    values: {
      type,
      startAt,
      endAt,
      newStartAt,
      newEndAt,
      message,
      description,
      restrictions,
    },
  };
  return database.query(query);
};

Model.delete = async (type, startAt, endAt) => {
  const missingParams = Object.entries({ type, startAt, endAt }).filter(
    item => item[1] === undefined,
  );
  if (missingParams.length !== 0) {
    return {
      error: {
        code: `400${Model.errorLevel}02`,
        message: `Required params missing: ${missingParams.map(item => item[0])}`,
      },
    };
  }

  const query = {
    text: `
      DELETE FROM Statuses
      WHERE "type" = :type
        AND "startAt" = :startAt
        AND "endAt" = :endAt
      RETURNING *
    `,
    values: {
      type,
      startAt,
      endAt,
    },
  };
  return database.query(query);
};

module.exports = Model;
