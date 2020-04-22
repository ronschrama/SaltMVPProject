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

  const testUserWrongPassword = {
    "id": "2",
    "email": "ron@lia.com",
    "username": "ron",
    "password": "secrets",
    "role": "1"
  };
  let request = {};
  let server = {};

  before(() => { server = app.listen(5000) });
  after(() => { server.close() });

  beforeEach(async () => {
    request = supertest(server);
  })

  it('returns a 403 status and an error message when a user tries to login with an incorrect email', (done) => {

    request
      .post(`/login`)
      .send(testUserWrongEmail)
      .expect(403)
      .expect({
        "status": "error",
        "message": "Incorrect email address"
      })
      .end((err) => {
        if (err) return err;
        done();
      });
  });

  it('returns a 403 status and an error message when a user tries to login with an incorrect password', (done) => {

    request
      .post(`/login`)
      .send(testUserWrongPassword)
      .expect(403)
      .expect({
        "status": "error",
        "message": "Incorrect password"
      })
      .end((err) => {
        if (err) return err;
        done();
      });
  });
  it('successfuly logs the user in if both password and email are correct', (done) => {

    request
      .post(`/login`)
      .send(testUser)
      .expect(200)
      .expect({
        "status": "success",
        "message": "Logged in"
      })
      .end((err) => {
        if (err) return err;
        done();
      });
  });
  it('successfuly logs the user out', () => {

    request
      .post(`/logout`)
      .expect(200)
      .expect({
        "status": "success",
        "message": "Logged out"
      })
      .end((err) => {
        if (err) return err;
      });
  });

})