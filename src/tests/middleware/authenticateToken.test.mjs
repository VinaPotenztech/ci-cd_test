import authenticateToken from '../../middleware/authMiddleware.js';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('authenticateToken middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        authorization: '',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should return 401 if no Authorization header is present', () => {
    req.headers.authorization = '';

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'No token provided',
      success: false,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if Authorization header is malformed', () => {
    req.headers.authorization = 'InvalidTokenString';

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'No token provided',
      success: false,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid', () => {
    req.headers.authorization = 'Bearer invalid-token';
    jwt.verify.mockImplementation(() => {
      throw new Error('invalid token');
    });

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid token',
      success: false,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if decoded token has no userId', () => {
    req.headers.authorization = 'Bearer valid-token';
    jwt.verify.mockReturnValue({}); // No userId

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid token',
      success: false,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next and attach userId if token is valid', () => {
    req.headers.authorization = 'Bearer valid-token';
    jwt.verify.mockReturnValue({ userId: '123abc', role: 'user' });

    authenticateToken(req, res, next);

    expect(req.id).toBe('123abc');
    expect(req.role).toBe('user'); // Optional if you're using role
    expect(next).toHaveBeenCalled();
  });
});
