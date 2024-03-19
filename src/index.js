const express = require("express");
const dotenv = require('dotenv');
const http = require('http');
const userRoutes = require('./v1/routes/userRoutes.js');
const chatRoomRoutes = require('./v1/routes/chatRoomRoutes.js');
const authMiddleware = require("./middlewares/authMiddleware.js");
const loggerMiddleware = require("./middlewares/loggerMiddleware.js");
const { getDirectusClient } = require('./utils/directusService.js');
const { wss } = require('./utils/websocket.js');
const { swaggerDocs: V1SwaggerDocs } = require('./config/swaggerConfig.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const server = http.createServer(app);

// Establish Directus connection
getDirectusClient();

// Attach WebSocket server to HTTP server
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
});

app.use(loggerMiddleware);
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/chatrooms', authMiddleware, chatRoomRoutes);

server.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
    V1SwaggerDocs(app, PORT);
});