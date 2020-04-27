/**
 *  Model for Users
 *
 */
// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt-nodejs');
const log = require('../../utils/logger')('Users');
const database = require('../connectors/postgres');

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------
const Model = {
  name: 'UserAccount',
  errorLevel: 'MUS',
};

Model.init = async () => {
  log.debug(`Initializing ${Model.name} model`);

  const query = {
    text: `
      CREATE TABLE IF NOT EXISTS UserAccounts (
        "uuid"          TEXT PRIMARY KEY,
        "email"         TEXT NOT NULL UNIQUE,
        "createdAt"     TIMESTAMP NOT NULL,
        "updatedAt"     TIMESTAMP NOT NULL
      )
    `,
  };

  const createdUserAccount = await database.query(query);
  if (createdUserAccount.error) {
    log.error(createdUserAccount);
    return createdUserAccount;
  }

  const queryPasswords = {
    text: `
      CREATE TABLE IF NOT EXISTS UserAccountPasswords(
        "uuid"          TEXT PRIMARY KEY REFERENCES UserAccount s("uuid") ON DELETE CASCADE,
        "passhash"      TEXT NOT NULL,
        "createdAt"     TIMESTAMP NOT NULL,
        "updatedAt"     TIMESTAMP NOT NULL
      )
    `,
  };

  const createdUserAccountPassword = database.query(queryPasswords);
  if (createdUserAccountPassword.error) {
    log.error(createdUserAccount);
  }
  return createdUserAccountPassword;
};

Model.create = async ({ email, password } = {}) => {
  const uuid = uuidv4();

  const queryUsers = {
    text: `
    INSERT INTO UserAccounts
    (
      "uuid",
      "email", 
      "createdAt",
      "updatedAt"
    ) 
    VALUES 
    (
      :uuid,
      :email, 
      LOCALTIMESTAMP, 
      LOCALTIMESTAMP
    )
    RETURNING *
    `,
    values: {
      uuid,
      email,
    },
  };

  const createdUsers = await database.query(queryUsers);
  if (createdUsers.error) return createdUsers;

  const queryPassword = {
    text: `
      INSERT INTO UserAccountPasswords
      (
        "uuid",
        "passhash",
        "createdAt",
        "updatedAt"
      )
      VALUES (
        :uuid,
        :passhash,
        LOCALTIMESTAMP,
        LOCALTIMESTAMP
      )
      RETURNING *
      `,
    values: {
      uuid,
      passhash: bcrypt.hashSync(password, bcrypt.genSaltSync()),
    },
  };

  const createdPassword = await database.query(queryPassword);
  if (createdPassword.error) return createdPassword;


  return {
    data: createdUsers.data.map((user) => {
      const message = `User ${user.uuid} was created: ${user.email}`;

      log.info(message);
    }),
  };
};

Model.getUser = ({ email, password } = {}) => {
  if (!email || !password) {
    return {
      error: {
        message: 'You must enter both a valid email and a valid password',
        code: `400${Model.errorLevel}00`,
      },
    };
  }
  const query = {
    text: `
    SELECT * FROM UserAccounts WHERE TRUE
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

Model.delete = async (email) => {
  const query = {
    text: `
      DELETE
      FROM UserAccounts
      WHERE "email" = :email
      RETURNING *
    `,
    values: {
      email,
    },
  };
  const accountRemoved = await database.query(query);

  if (!accountRemoved.error) {
    const message = `User with ${accountRemoved.data[0].email} was removed`;

    log.info(message);
  }

  return accountRemoved;
};
