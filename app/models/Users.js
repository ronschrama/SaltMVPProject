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
  name: 'Users',
  errorLevel: 'MUS',
};

Model.init = async () => {
  log.debug(`Initializing ${Model.name} model`);

  const queryUserTable = {
    text: `
      CREATE TABLE IF NOT EXISTS Users (
        "uuid" TEXT PRIMARY KEY NOT NULL,
        "email" TEXT NOT NULL UNIQUE,
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
      "uuid" PRIMARY KEY REFERENCES Users ("uuid") ON DELETE CASCADE,
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

  const queryUsers = {
    text: `
    INSERT INTO Users 
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
      uuid: uuidv4(),
      email,
    },
  };

  const createdUsers = await database.query(queryUsers);
  if (createdUsers.error) return createdUsers;

  const queryPassword = {
    text: `
      INSERT INTO UserPasswords
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

Model.delete = async (uuid) => {
  const query = {
    text: `
      DELETE
      FROM Users
      WHERE "uuid" = :uuid
      RETURNING *
    `,
    values: {
      uuid,
    },
  };
  const accountRemoved = await database.query(query);

  if (!accountRemoved.error) {
    const message = `User with ${accountRemoved.data[0].email} was removed`;

    log.info(message);
  }

  return accountRemoved;
};
