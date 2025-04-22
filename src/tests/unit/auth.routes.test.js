import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.mjs';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth Routes', () => {
  it('should register a user', async () => {
    const res = await request(app)
      .post('/employer-signup')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  it('should not register with duplicate email', async () => {
    const res = await request(app)
      .post('/employer-signup')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('User already exists');
  });

  it('should login successfully', async () => {
    const res = await request(app)
      .post('/employer-login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should return error for wrong credentials', async () => {
    const res = await request(app)
      .post('/employer-login')
      .send({ email: 'test@example.com', password: 'wrongpass' });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid credentials');
  });
});
