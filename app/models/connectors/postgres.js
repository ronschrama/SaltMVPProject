/**
 * Entrypoint to connect to PostgresSQL database
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

const { Pool, types } = require('pg');

const log = require('../../utils/logger')('postgres');

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const pool = new Pool({ database: `${process.env.PGDATABASE}` });

// Return TIMESTAMP PGSQL type in milliseconds instead of Date object
// and remove timezone
types.setTypeParser(1114, val => new Date(`${val}+0000`).getTime());

const Client = { errorLevel: 'MCP' };

// If you want to get not only rows from postgres response
// use this method, instead use simple Client.query
Client.createDatabase = async () => {
  try {
    log.debug(`Checking/creating '${process.env.PGDATABASE}' database`);
    const defaultPool = new Pool({ database: 'postgres' });
    return await defaultPool.query(
      `CREATE DATABASE "${process.env.PGDATABASE}"`,
    );
  } catch (error) {
    if (error.code === '42P04') {
      return {
        data: {
          message: `Database '${process.env.PGDATABASE}' already exists`,
        },
      };
    }
    return Client.handleError(error);
  }
};

// If you want to get not only rows from postgres response
// use this method, instead use simple Client.query
Client.queryRaw = async (query, params) => {
  try {
    return pool.query(query, params);
  } catch (error) {
    return Client.handleError(error);
  }
};

// Use this in case when you only care about rows and want named params support
Client.query = async (query, values) => {
  try {
    let pgQuery = query;
    if (query.text) {
      pgQuery = getNamedParams(query.text, query.values);
    } else if (query && values) {
      pgQuery = getNamedParams(query, values);
    }
    return { data: (await pool.query(pgQuery, values)).rows };
  } catch (error) {
    // if (process.env.NODE_ENV === 'development') log.info(query);
    return Client.handleError(error);
  }
};

Client.handleError = error => {
  log.error(error);
  switch (error.code) {
    case 'ENOTFOUND':
      return { error: { message: "Can't connect to database", code: `500${Client.errorLevel}10` } };
    case '42P07':
      return { error: { message: `Model creation error: ${error.message}`, code: error.code } };
    case '42601':
      if (process.env.NODE_ENV === 'development') {
        return {
          error: { message: `Database query syntax error: ${error.message}`, code: error.code },
        };
      }
      return { error: { message: 'Internal database error', code: `500${Client.errorLevel}11` } };
    case '23505':
      return { error: { message: `${error.detail}`, code: `500${Client.errorLevel}12` } };
    default:
      if (process.env.NODE_ENV === 'development') {
        if (error.table) {
          return {
            error: {
              message: `Database error on ${error.table} model: ${error.message}`,
              code: error.code || `500${Client.errorLevel}13`,
              details: error.details,
            },
          };
        }
        return {
          error: {
            message: `Database error: ${error.message}`,
            code: error.code || `500${Client.errorLevel}14`,
          },
        };
      }
      return { error: { message: 'Internal database error', code: `500${Client.errorLevel}15` } };
  }
};

function getNamedParams(query, values) {
  const valuesParsed = [];
  return {
    text: query.replace(/(::?)([a-zA-Z0-9_]+)/g, (_, prefix, key) => {
      if (prefix !== ':') {
        return prefix + key;
      }
      if (key in values) {
        valuesParsed.push(values[key]);
        return `$${valuesParsed.length}`;
      }
      throw new Error(`Value for ${key} not provided for statement: 
                       ${query}
                       only this was provided:
                       ${JSON.stringify(values)}
                      `);
    }),
    values: valuesParsed,
  };
}

module.exports = Client;
