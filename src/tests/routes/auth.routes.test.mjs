import request from 'supertest';
import app from '../../app.mjs'; // ensure this is the correct path to your app

describe('Employer Auth Routes', () => {
  test('POST /ats/api/employer-signup - success', async () => {
    const res = await request(app).post('/employer-signup').send({
      name: 'Test Employer',
      email: 'employer@example.com',
      password: 'password123',
      role: 'employer', // if your register controller supports roles
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  test('POST /ats/api/employer-login - success', async () => {
    // You may want to register the user before this test or use a mock
    const res = await request(app).post('/employer-login').send({
      email: 'employer@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token'); // assuming your login returns a token
  });
});
