const axios = require('axios');

const BASE_URL = 'http://127.0.0.1:3000'; // Ensure this matches your local API

describe('Lambda API Tests', () => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      // If your Lambda requires a token, include it here:
      // 'Authorization': 'Bearer <your_token>',
    },
  };

  test('Signup', async () => {
    const res = await axios.post(
      `${BASE_URL}/employer-signup`,
      {
        name: 'john',
        email: 'john@email.com',
        password: '123',
        role: 'user',
      },
      axiosConfig,
    );

    expect(res.status).toBe(200); // Adjust based on your expected success code
  });

  test('Login', async () => {
    const res = await axios.post(
      `${BASE_URL}/employer-login`,
      {
        email: 'john@email.com',
        password: '123',
      },
      axiosConfig,
    );

    expect(res.status).toBe(200); // Adjust based on your expected success code
  });
});
