const chatRoomController = require('../contollers/chatRoomController.js');

describe('chatRoomController', () => {
  describe('create', () => {
    it('should return 400 if name is missing', async () => {
      const req = {
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await chatRoomController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        status: 'FAILED',
        data: {
          error: 'Name is required. Please provide a valid name.',
        },
      });
    });

  });
});