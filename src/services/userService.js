const { createUser } = require('@directus/sdk');
const { getDirectusClient } = require('../utils/directusService.js');

const directusClient = getDirectusClient();

const userService = {
  register: async (newUser) => {
    try {
        await directusClient.request(createUser(newUser));
    } catch (error) {
        throw error;
    }
  },

  login: async ({ email, password }) => {
    try {
        const token = await directusClient.login(email, password);

        if (!token) {
            throw new Error('Invalid email or password');
        }

        return token;
    } catch (error) {
        throw error;
    }
  },

  logout: async () => {
    try {
        await directusClient.logout();
    } catch (error) {
        throw error
    }
  }
};

module.exports = userService;