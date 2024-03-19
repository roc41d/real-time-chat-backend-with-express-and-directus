const express = require('express');
const userController = require('../../contollers/userController.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Register, Login, and Logout
 */


/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Register, Login, and Logout
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully registered a new user
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Login with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             email: 'thomaz@demo.com'
 *             password: '12345'
 *     responses:
 *       '200':
 *         description: Successfully logged in
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized - Invalid email or password
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     tags: [Authentication]
 *     summary: Logout the currently authenticated user
 *     responses:
 *       '200':
 *         description: Successfully logged out
 *       '401':
 *         description: Unauthorized - Missing or invalid Bearer token
 *       '500':
 *         description: Internal server error
 */
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

module.exports = router;