const userService = require('../services/userService.js');
const Role = require('../utils/constants.js');

const userController = {
  register: async (req, res) => {
    const { body } = req;
    if ( !body.first_name || !body.last_name || !body.email || !body.password ) {

        res
          .status(400)
          .send({
              status: "FAILED",
              data: {
                error:
                    "First name, last name, email, and password are required.",
                },
          });
    }

    // Check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error: "Please provide a valid email address.",
            },
        });
    }
    try {
      const newUser = {
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: body.password,
        role: Role.id
      }
      await userService.register(newUser);
      res
        .status(201)
        .send({
          status: "OK", 
          data: { message: 'User registered successfully'
        }});
    } catch (error) {
      console.log('register_error', error);
        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  },

  login: async (req, res) => {
    const { body } = req;
    if ( !body.email || !body.password ) {
        res
          .status(400)
          .send({
              status: "FAILED",
              data: {
                error:
                    "Email and password are required.",
                },
          });
    }
    try {
      const token = await userService.login(req.body);
      if (!token) {
        res
          .status(401)
          .send({status: "FAILED", data: {error: 'Invalid email or password' }});
        
      }
      const data = {
        refresh_token: token.refresh_token,
        access_token: token.access_token
      }
      res.status(200).send({status: "OK", data });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  },

  logout: async (req, res) => {
    try {
      await userService.logout();
      res.status(200).send({status: "OK"});
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
};

module.exports = userController;