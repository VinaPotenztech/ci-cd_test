import { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcrypt';
import * as userController from '../src/controllers/user.controller.js';
import User from '../src/models/user.model.js';
import {
  connectTestDB,
  disconnectTestDB,
  clearTestDB,
} from '../src/utils/testDB.js';
process.env.JWT_SECRET = 'test_secret_key';

describe('User Controller', () => {
  let req, res;

  before(async function () {
    this.timeout(20000); // increase timeout for db connect
    await connectTestDB();
  });

  after(async () => {
    await disconnectTestDB();
  });

  beforeEach(async () => {
    await clearTestDB();
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
  });

  describe('register()', () => {
    it('should respond with 201 and return token if successful', async () => {
      req.body = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      await userController.register(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      const jsonResponse = res.json.getCall(0).args[0];
      expect(jsonResponse).to.have.property('token');
      expect(jsonResponse.user.email).to.equal('test@example.com');
    });
  });

  describe('login()', () => {
    it('should return 404 if user is not found', async () => {
      req.body = { email: 'nouser@example.com', password: 'pass' };
      await userController.login(req, res);
      expect(res.status.calledWith(404)).to.be.true; // Expect a 404 error
    });

    it('should return 401 if password is incorrect', async () => {
      await User.create({
        name: 'Wrong Password',
        email: 'user@example.com',
        password: await bcrypt.hash('correctpass', 10), // Save the user with a hashed password
      });

      req.body = { email: 'user@example.com', password: 'wrongpass' };
      await userController.login(req, res);
      expect(res.status.calledWith(401)).to.be.true; // Expect a 401 error for incorrect password
    });

    it('should return token if login is successful', async () => {
      await User.create({
        name: 'Valid User',
        email: 'valid@example.com',
        password: await bcrypt.hash('validpass', 10), // Save the valid user
      });

      req.body = { email: 'valid@example.com', password: 'validpass' };
      await userController.login(req, res);

      expect(res.status.calledWith(200)).to.be.true; // Expect a 200 status
      const jsonResponse = res.json.getCall(0).args[0]; // Get response
      expect(jsonResponse).to.have.property('token'); // Ensure token is returned
      expect(jsonResponse.user.email).to.equal('valid@example.com'); // Check user email
    });
  });
});
