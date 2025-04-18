const axios = require('axios');

const BASE_URL = 'http://127.0.0.1:3000';

describe('Local Lambda API Tests', () => {
  test('Register', async () => {
    const res = await axios.post(`${BASE_URL}/employer-signup`, {
      name: 'john',
      email: 'john@email.com',
      password: '123',
      role: 'user',
    });
    expect(res.status).toBe(200);
  });

  test('Login', async () => {
    const res = await axios.post(`${BASE_URL}/employer-login`, {
      email: 'john@email.com',
      password: '123',
    });
    expect(res.status).toBe(200);
    expect(res.data.token).toBeDefined();
  });
});
