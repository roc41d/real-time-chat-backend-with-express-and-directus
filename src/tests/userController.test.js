const userController = require('../contollers/userController.js');

describe('userController', () => {
  describe('register', () => {
    it('should return 400 if required fields are missing', async () => {
      const req = {
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await userController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        status: 'FAILED',
        data: {
          error: 'First name, last name, email, and password are required.',
        },
      });
    });

    it('should return 400 if email format is invalid', async () => {
      const req = {
        body: {
          first_name: 'John',
          last_name: 'Doe',
          email: 'invalid_email',
          password: 'password123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await userController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        status: 'FAILED',
        data: {
          error: 'Please provide a valid email address.',
        },
      });
    });

  });

  describe('login', () => {
    it('should return 400 if email or password is missing', async () => {
      const req = {
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        status: 'FAILED',
        data: {
          error: 'Email and password are required.',
        },
      });
    });

  });
});