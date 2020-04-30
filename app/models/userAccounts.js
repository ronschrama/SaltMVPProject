/**
 *  Model for Users
 *
 */
// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');
const log = require('../utils/logger')('UserAccounts');
const database = require('./connectors/postgres');
const validator = require('validator');

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------
const Model = {
  name: 'UserAccounts',
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
        "uuid"          TEXT PRIMARY KEY REFERENCES UserAccounts("uuid") ON DELETE CASCADE,
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
  const isValidEmail = validator.isEmail(email);
  if (!isValidEmail) {
    const message = ` ${email} is not a valid email account`;

    log.info(message);

    return {
      error: {
        code: `403${Model.errorLevel}00`,
        message,
      }
    }
  };

  if (password.length > 15 || password.length < 8) {
    const message = ` Your password should be between 8 and 15 characters`;

    log.info(message);
    return {
      error: {
        code: `403${Model.errorLevel}00`,
        message,
      }
    }
  }

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
      email: email.toLowerCase(),
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

  await database.query(queryPassword);

  return {
    data: createdUsers.data.map((user) => {
      const message = `User ${user.uuid} was created: ${user.email}`;

      log.info(message);
    }),
  };
};

Model.getUser = async (email, password) => {
let uuid  = await database.query("select uuid from useraccounts where (email = $1)", [email]);
if(uuid.data.length === 0) {
  const message = ` There is no user with that email`;

  log.info(message);
  return {
    error: {
      code: `404${Model.errorLevel}00`,
      message,
    },
  };
};
uuid = uuid.data[0].uuid;

let passhash = await database.query("select passhash from useraccountpasswords where (uuid = $1)", [uuid]);
passhash = passhash.data[0].passhash;

const isPasswordValid = bcrypt.compareSync(password, passhash);

if (!isPasswordValid) {
  const message = ` The password is not correct`;
    
  log.info(message);
  return {
    error: {
      code: `404${Model.errorLevel}00`,
      message,
    },
  };
}

return {data: "User authenticated"};
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
  if(accountRemoved.data.length === 0) {
    const message = `User with ${email} was not found`;
    
    log.info(message); 
    return {
      error: {
        code: `404${Model.errorLevel}00`,
        message,
      },
    };
  } else if (!accountRemoved.error) {
    const message = `User with ${accountRemoved.data[0].email} was removed`;

    log.info(message);
    return {
      data: message,
    };
  }

  // return accountRemoved;
};


module.exports = Model;
