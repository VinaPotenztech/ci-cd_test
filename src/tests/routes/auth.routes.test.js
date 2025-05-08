import request from 'supertest';
import app from '../../app';

describe('Auth Routes', () => {
  test('POST /register - success', async () => {
    const res = await request(app).post('/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  // Add more tests for other routes
});
