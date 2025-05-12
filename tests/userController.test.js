import { createUser, register } from '../src/controllers/user.controller.js';
// import User from '../src/models/User.js';
import {
  connectTestDB,
  disconnectTestDB,
  clearTestDB,
} from '../src/utils/testDB.js';
import httpMocks from 'node-mocks-http';

describe('User Controller', () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  beforeEach(async () => {
    await clearTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const req = httpMocks.createRequest({
        body: {
          name: 'John Doe',
          email: 'john@example.com',
          password: 30,
        },
      });
      const res = httpMocks.createResponse();

      await createUser(req, res);

      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toHaveProperty('_id');
      expect(res._getJSONData().name).toBe('John Doe');
    });

    it('should return 400 for invalid data', async () => {
      const req = httpMocks.createRequest({
        body: {
          name: 'John Doe',
          // Missing email and age
        },
      });
      const res = httpMocks.createResponse();

      await createUser(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toHaveProperty('error');
    });
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const req = httpMocks.createRequest({
        body: {
          name: 'John Doe',
          email: 'john@example.com',
          password: '123',
        },
      });
      const res = httpMocks.createResponse();

      await register(req, res);

      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toHaveProperty('_id');
      expect(res._getJSONData().name).toBe('John Doe');
    });

    it('should return 400 for invalid data', async () => {
      const req = httpMocks.createRequest({
        body: {
          name: 'John Doe',
        },
      });
      const res = httpMocks.createResponse();

      await register(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toHaveProperty(
        'message',
        'All fields are required',
      );
    });
  });
});
