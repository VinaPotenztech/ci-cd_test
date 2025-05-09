import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app'; // your Express app that uses the router
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany(); // clear DB after each test
});

describe('Employer Auth Routes', () => {
  describe('POST /api/ats/employer-signup', () => {
    it('should register employer successfully', async () => {
      const res = await request(app).post('/api/ats/employer-signup').send({
        name: 'Recruiter One',
        email: 'recruiter@example.com',
        password: 'securepass123',
        role: 'employer',
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('User registered successfully');
    });

    it('should not register if employer already exists', async () => {
      await User.create({
        name: 'Recruiter',
        email: 'recruiter@example.com',
        password: await bcrypt.hash('password', 10),
        role: 'employer',
      });

      const res = await request(app).post('/api/ats/employer-signup').send({
        name: 'Recruiter',
        email: 'recruiter@example.com',
        password: 'password',
        role: 'employer',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('User already exists');
    });
  });

  describe('POST /api/ats/employer-login', () => {
    beforeEach(async () => {
      const hashed = await bcrypt.hash('mypassword', 10);
      await User.create({
        name: 'Employer Test',
        email: 'employer@test.com',
        password: hashed,
        role: 'employer',
      });
    });

    it('should login employer and return token', async () => {
      const res = await request(app).post('/api/ats/employer-login').send({
        email: 'employer@test.com',
        password: 'mypassword',
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.success).toBe(true);
    });

    it('should reject login with wrong password', async () => {
      const res = await request(app).post('/api/ats/employer-login').send({
        email: 'employer@test.com',
        password: 'wrongpass',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Invalid credentials');
    });
  });
});
