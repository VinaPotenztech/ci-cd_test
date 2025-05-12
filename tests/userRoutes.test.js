import request from 'supertest';
import app from '../src/app.mjs';
import User from '../src/models/user.model.js';
import {
  connectTestDB,
  disconnectTestDB,
  clearTestDB,
} from '../src/utils/testDB.js';

describe('User Routes', () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  beforeEach(async () => {
    await clearTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const response = await request(app).post('/api/users').send({
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 25,
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.name).toBe('Jane Doe');
    });
  });

  describe('GET /api/users', () => {
    it('should get all users', async () => {
      await new User({
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 25,
      }).save();

      const response = await request(app).get('/api/users');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].name).toBe('Jane Doe');
    });
  });

  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      const response = await request(app).post('/api/users').send({
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 25,
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.name).toBe('Jane Doe');
    });
  });
});
