const express = require("express");
const chatRoomController = require("../../contollers/chatRoomController.js");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Create chat room, List chat room, Get chat room details, Update chat room, Delete chat room, Join chat room, Leave chat room, Send message, Get messages
 */

/**
 * @swagger
 * /api/v1/chatrooms:
 *   post:
 *     tags: [Chat]
 *     summary: Create a new chat room
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Successfully created a new chat room
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized - Missing or invalid Bearer token
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/chatrooms:
 *   get:
 *     tags: [Chat]
 *     summary: Get a list of all chat rooms
 *     responses:
 *       '200':
 *         description: Successfully retrieved list of chat rooms
 *       '401':
 *         description: Unauthorized - Missing or invalid Bearer token
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/chatrooms/{id}:
 *   get:
 *     tags: [Chat]
 *     summary: Get details of a specific chat room
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the chat room to get details for
 *     responses:
 *       '200':
 *         description: Successfully retrieved details of the chat room
 *       '401':
 *         description: Unauthorized - Missing or invalid Bearer token
 *       '404':
 *         description: Chat room not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/chatrooms/{id}:
 *   put:
 *     tags: [Chat]
 *     summary: Update details of a specific chat room
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the chat room to update
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully updated details of the chat room
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized - Missing or invalid Bearer token
 *       '404':
 *         description: Chat room not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/chatrooms/{id}:
 *   delete:
 *     tags: [Chat]
 *     summary: Delete a specific chat room
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the chat room to delete
 *     responses:
 *       '204':
 *         description: Successfully deleted the chat room
 *       '401':
 *         description: Unauthorized - Missing or invalid Bearer token
 *       '404':
 *         description: Chat room not found
 *       '500':
 *         description: Internal server error
 */


router.post("/", chatRoomController.create);
router.get("/", chatRoomController.list);
router.get("/:id", chatRoomController.details);
router.put("/:id", chatRoomController.update);
router.delete("/:id", chatRoomController.delete);

/**
 * @swagger
 * /api/v1/chatrooms/{roomId}/join:
 *   post:
 *     tags: [Chat]
 *     summary: Join a chat room
 *     description: Join a chat room identified by roomId
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         description: ID of the chat room to join
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully joined the chat room
 *       '401':
 *         description: Unauthorized - Missing or invalid Bearer token
 *       '404':
 *         description: Chat room not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/chatrooms/{roomId}/leave:
 *   post:
 *     tags: [Chat]
 *     summary: Leave a chat room
 *     description: Leave a chat room identified by roomId
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         description: ID of the chat room to leave
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully left the chat room
 *       '401':
 *         description: Unauthorized - Missing or invalid Bearer token
 *       '404':
 *         description: Chat room not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/chatrooms/{roomId}/messages:
 *   post:
 *     tags: [Chat]
 *     summary: Send a message in a chat room
 *     description: Send a message in a chat room identified by roomId
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         description: ID of the chat room to send a message
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Message sent successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized - Missing or invalid Bearer token
 *       '404':
 *         description: Chat room not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/chatrooms/{roomId}/messages:
 *   get:
 *     tags: [Chat]
 *     summary: Get messages in a chat room
 *     description: Get messages in a chat room identified by roomId
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         description: ID of the chat room to get messages from
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved messages
 *       '401':
 *         description: Unauthorized - Missing or invalid Bearer token
 *       '404':
 *         description: Chat room not found
 *       '500':
 *         description: Internal server error
 */
router.post("/:roomId/join", chatRoomController.joinChatRoom);
router.post("/:roomId/leave", chatRoomController.leaveChatRoom);
router.post("/:roomId/messages", chatRoomController.sendMessage);
router.get("/:roomId/messages", chatRoomController.getMessage);

module.exports = router;
