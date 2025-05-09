import request from 'supertest';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import app from '../../app.mjs';
import User from '../../models/user.model.js';
import { jest } from '@jest/globals';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany({});
  jest.clearAllMocks();
});

describe('Auth Controller', () => {
  describe('POST /api/ats/employer-signup', () => {
    it('should register a new user', async () => {
      bcryptjs.hash.mockResolvedValue('hashed-password');

      const res = await request(app).post('/employer-signup').send({
        name: 'john',
        email: 'john@email.com',
        password: '123',
        role: 'user',
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('User registered successfully');
    });

    it('should not register user if email exists', async () => {
      await User.create({
        name: 'Existing User',
        email: 'john@email.com',
        password: 'hashed-password',
        role: 'user',
      });

      const res = await request(app).post('/api/ats/employer-signup').send({
        name: 'john',
        email: 'john@email.com',
        password: '123',
        role: 'user',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('User already exists');
    });
  });

  describe('POST /api/ats/employer-login', () => {
    it('should login with valid credentials', async () => {
      const password = '123';
      const hashedPassword = 'hashed-password';
      await User.create({
        name: 'User',
        email: 'john@email.com',
        password: hashedPassword,
        role: 'user',
      });

      bcryptjs.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('fake-jwt-token');

      const res = await request(app).post('/api/ats/employer-login').send({
        email: 'john@email.com',
        password,
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBe('fake-jwt-token');
      expect(res.body.success).toBe(true);
    });

    it('should not login with invalid credentials', async () => {
      const res = await request(app).post('/api/ats/employer-login').send({
        email: 'nonexist@example.com',
        password: 'wrong',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Invalid credentials');
    });
  });
});
