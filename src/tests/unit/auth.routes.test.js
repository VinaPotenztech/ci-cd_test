import request from 'supertest';
import app from '../../app.mjs';
describe('Auth Routes', () => {
  describe('POST /employer-signup', () => {
    it('should register a user', async () => {
      const res = await request(app).post('/employer-signup').send({
        name: 'John Doe',
        email: 'john@test.com',
        password: 'Password123!',
        role: 'employer',
      });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe('User registered successfully');
    });

    it('should not register with duplicate email', async () => {
      await request(app).post('/employer-signup').send({
        name: 'John',
        email: 'john@test.com',
        password: 'pass',
        role: 'employer',
      });

      const res = await request(app).post('/employer-signup').send({
        name: 'John',
        email: 'john@test.com',
        password: 'pass',
        role: 'employer',
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('User already exists');
    });
  });

  describe('POST /employer-login', () => {
    beforeEach(async () => {
      await request(app).post('/employer-signup').send({
        name: 'Test Login',
        email: 'login@test.com',
        password: 'testpass',
        role: 'employer',
      });
    });

    it('should login successfully', async () => {
      const res = await request(app).post('/employer-login').send({
        email: 'login@test.com',
        password: 'testpass',
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should return error for wrong credentials', async () => {
      const res = await request(app).post('/employer-login').send({
        email: 'login@test.com',
        password: 'wrongpass',
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Invalid credentials');
    });
  });
});
