import request from 'supertest';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import app from '../../app.js'; // your Express app
import User from '../../models/user.model.js';

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
});

describe('Auth Controller', () => {
  describe('POST /employer-signup', () => {
    it('should register a new user', async () => {
      bcryptjs.hash.mockResolvedValue('hashed-password');

      const res = await request(app).post('/employer-signup').send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'user',
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('User registered successfully');
    });

    it('should not register user if email exists', async () => {
      await User.create({
        name: 'Existing User',
        email: 'test@example.com',
        password: 'hashed-password',
        role: 'user',
      });

      const res = await request(app).post('/employer-signup').send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'user',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('User already exists');
    });
  });

  describe('POST /employer-login', () => {
    it('should login with valid credentials', async () => {
      const password = 'password123';
      const hashedPassword = await bcryptjs.hash(password, 10);
      const user = await User.create({
        name: 'User',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'user',
      });

      bcryptjs.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('fake-jwt-token');

      const res = await request(app).post('/employer-login').send({
        email: 'test@example.com',
        password,
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBe('fake-jwt-token');
      expect(res.body.success).toBe(true);
    });

    it('should not login with invalid credentials', async () => {
      const res = await request(app).post('/employer-login').send({
        email: 'wrong@example.com',
        password: 'wrongpass',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Invalid credentials');
    });
  });

  describe('POST /logout', () => {
    it('should logout user and clear cookie', async () => {
      const res = await request(app).post('/logout');

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Logged out successfully');
    });
  });

  describe('GET /profile', () => {
    it('should return user profile', async () => {
      const user = await User.create({
        name: 'Profile User',
        email: 'profile@example.com',
        password: 'hashed-password',
        role: 'user',
      });

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
      );

      const res = await request(app)
        .get('/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.email).toBe('profile@example.com');
    });
  });
});
