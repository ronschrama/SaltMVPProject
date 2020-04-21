const supertest = require('supertest');
const { app } = require('./server');

describe('User API', () => {
  const testUser = {
    "id": "2",
    "email": "ron@lia.com",
    "username": "ron",
    "password": "secret",
    "role": "1"
  };

  const testUserWrongEmail = {
    "id": "2",
    "email": "ron@lia.co",
    "username": "ron",
    "password": "secret",
    "role": "1"
  };
  let request = {};
  let server = {};

  before(() => { server = app.listen(5000) });
  after(() => { server.close() });

  beforeEach(async () => {
    request = supertest(server);
  })

  const throwIfError = (err, res) => { if (err) throw err };

  it('returns a 403 status and an error message when a user tries to login with an incorrect email', async () => {

    request
      .post(`/login`)
      .send(testUserWrongEmail)
      .expect(403)
      .expect({
        "status": "error",
        "message": "Incorrect email address"
      })
      .end(throwIfError);
  })

})