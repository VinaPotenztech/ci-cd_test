import authenticateToken from '../../middleware/authMiddleware.js';
import jest from 'jest'; // Import jest explicitly

describe('Authenticate Token Middleware', () => {
  test('should return 401 if no token is provided', () => {
    const req = { headers: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'No token provided',
      success: false,
    });
    expect(next).not.toHaveBeenCalled();
  });

  // Add more tests for valid token, invalid token, etc.
});
