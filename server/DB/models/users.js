/**
 *  Model for Accounts
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const fs = require('fs');
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const log = require('../../utils/logger')('Accounts');

const database = require('../connectors/postgres');

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------
const Model = {
  name: 'Users',
  errorLevel: 'MUS',
};

Model.init = async () => {
  log.debug(`Initializing ${Model.name} model`);

  const queryUserTable = {
    text: `
      CREATE TABLE IF NOT EXISTS Users (
        "usid" TEXT PRIMARY KEY NOT NULL,
        "email" VARCHAR (255) UNIQUE,
        "createAt" TIMESTAMP NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL
      )
      `,
  };

  const createdUserTable = await database.query(queryUserTable);
  if (createdUserTable.error) {
    log.error(createdUserTable);
    return createdUserTable;
  }

  const queryPasswordTable = {
    text: `
    CREATE TABLE IF NOT EXISTS UserPasswords (
      "usid" PRIMARY KEY REFERENCES Users ("usid") ON DELETE CASCADE,
      "passhash" TEXT NOT NULL,
      "createAt" TIMESTAMP NOT NULL,
      "updatedAt" TIMESTAMP NOT NULL
    );
    `,
  };

  const createdPasswordTable = await database.query(queryPasswordTable);
  if (createdPasswordTable.error) {
    log.error(createdPasswordTable);
  }
  return createdPasswordTable;
};

Model.create = async ({ email, password } = {}) => {
  const usid = uuid;

  if ((!email && password) || (email && !password)) {
    return {
      error: {
        message: 'You must enter both a valid email and a valid password',
        code: `400${Model.errorLevel}00`,
      },
    };
  }


  const queryUsers = {
    text: `
    INSERT INTO Users 
    (
      "usid",
       "email", 
       "createdAt",
        "updatedAt"
    ) 
    VALUES 
    (
      :usid,
       :email, 
       LOCALTIMESTAMP, 
       LOCALTIMESTAMP
    )
    RETURNING *
    `,
    values: {
      usid,
      email,
    },
  };

  const createdUsers = await database.query(queryUsers);
  if (createdUsers.error) return createdUsers;

  if (password) {
    const queryPassword = {
      text: `
      INSERT INTO UserPasswords
      (
        "usid",
        "passhash",
        "createdAt",
        "updatedAt"
      )
      VALUES (
        :usid,
        :passhash,
        LOCALTIMESTAMP,
        LOCALTIMESTAMP
      )
      RETURNING *
      `,
      values: {
        usid,
        passhash: bcrypt.hashSync(password, bcrypt.genSaltSync()),
      },
    };

    const createdPassword = await database.query(queryPassword);
    if (createdPassword.error) return createdPassword;
  }

  return {
    data: createdUsers.data.map((user) => {
      const message = `User ${user.usid} was created: ${user.email}`;

      log.info(message);
    }),
  };
};

Model.get = ({ email, password } = {}) => {
  const query = {
    text: `
    SELECT * FROM Users WHERE TRUE
    ${email ? 'AND "email" = :email' : ''}
    ${password ? 'AND "password" = :password' : ''}
    `,
    values: {
      email,
      password,
    },
  };
  return database.query(query);
};

Model.delete = async (usid) => {
  const query = {
    text: `
      DELETE
      FROM Users
      WHERE "uid" = :uid
      RETURNING *
    `,
    values: {
      usid,
    },
  };
  const accountRemoved = await database.query(query);

  if (!accountRemoved.error) {
    const message = `User with ${accountRemoved.data[0].email} was removed`;

    log.info(message);
  }

  return accountRemoved;
};

Model.getJwtPubKey = () => {
  const pubKey = fs.readFileSync(`${__dirname}/jwt.pub`, 'utf8');
  if (pubKey.error) {
    log.error(pubKey);
    return { error: { message: 'Unable to fetch pubKey', code: `500${Model.errorLevel}00` } };
  }
  return { data: pubKey };
};

Model.getJwtPrivateKey = () => {
  const pubKey = fs.readFileSync(`${__dirname}/jwt.key`, 'utf8');
  if (pubKey.error) {
    log.error(pubKey);
    return { error: { message: 'Unable to fetch key', code: `500${Model.errorLevel}02` } };
  }
  return { data: pubKey };
};
