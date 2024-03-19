// import { WebSocketServer } from 'ws';
const { WebSocket } = require('ws');

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received:', message);
    // TODO: Add logic to persist messages coming from frontend web client
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    // Perform any necessary cleanup or leave chat room logic
  });
});

const broadcastMessage = (message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

module.exports = { wss, broadcastMessage };