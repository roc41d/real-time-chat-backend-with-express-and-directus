const chatRoomService = require('../services/chatRoomService.js');
const { broadcastMessage } = require('../utils/websocket.js');

const chatRoomController = {
    create: async (req, res) => {
        const { body } = req;
        if ( !body.name ) {
            res
              .status(400)
              .send({
                  status: "FAILED",
                  data: {
                    error:
                        "Name is required. Please provide a valid name.",
                    },
              });
        }
        try {
            const newChatRoom = {
                name: body.name,
                description: body.description ? body.description : '',
                user_created: res.user.id,
            };
          const chatRoom = await chatRoomService.create(newChatRoom);
          res.status(201).send({status: "OK", data: chatRoom});
        } catch (error) {
          res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
        }
    },

    list: async (req, res) =>{
        try {
          const chatRooms = await chatRoomService.list();
          res.status(200).send({status: "OK", data: chatRooms});
        } catch (error) {
          res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
        }
    },

    details: async (req, res) => {
        const { id } = req.params;
        try {
          const chatRoom = await chatRoomService.details(id);
          if (!chatRoom) {
            res
              .status(404)
              .send({status: "FAILED", data: {error: 'Chat room not found' }});
          }
          res.status(200).send({status: "OK", data: chatRoom});
        } catch (error) {
          res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
        }
    },
    
    update: async (req, res) => {
        const { id } = req.params;
        if ( !id ) {
            res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                error:
                    "Chat room id is required. Please provide a valid chat room id.",
                },
            });
        }
        try {
          const updatedChatRoom = await chatRoomService.update(id, req.body);
          res.status(200).send({status: "OK", data: updatedChatRoom});
        } catch (error) {
          res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
        }
    },
    
    delete: async (req, res) => {
        const { id } = req.params;
        try {
          await chatRoomService.delete(id);
          res.status(204).send({status: "OK"});
        } catch (error) {
          res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
        }
    },

    joinChatRoom: async (req, res) => {
      const { roomId } = req.params;
      try {
        const roomData = {
          chatroom_id: roomId,
          user_id: res.user.id,
        };
        await chatRoomService.joinChatRoom(roomData);
        res.status(200).send({status: "OK"});

        const messageToBeBroadcast = {
          type: 'joinedChat',
          user: res.user.email,
          chatRoomId: roomId,
          message: `${res.user.email} joined chat`,
          sentAt: new Date()
        }
        broadcastMessage(messageToBeBroadcast);
      } catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
      }
    },

    leaveChatRoom: async (req, res) => {
      const { roomId } = req.params;
      try {
        const roomData = {
          chatroom_id: roomId,
          user_id: res.user.id,
        };
        await chatRoomService.leaveChatRoom(roomData);
        res.status(200).send({status: "OK"});

        const messageToBeBroadcast = {
          type: 'leftChat',
          user: res.user.email,
          chatRoomId: roomId,
          message: `${res.user.email} left chat`,
          sentAt: new Date()
        }
        broadcastMessage(messageToBeBroadcast);
      } catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
      }
    },

    sendMessage: async (req, res) => {
      const { roomId } = req.params;
      const { message } = req.body;
      if (!message) {
          res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                error:
                    "Message is required.",
                },
            });
      }
      try {
        const newMessage = {
          user_id: res.user.id,
          chatroom_id: roomId,
          message: message
        }

        const data = await chatRoomService.sendMessage(newMessage);
        res.status(200).send({status: "OK"});
        
        // broadcast message to connected websocket clients
        const messageToBeBroadcast = {
          type: 'message',
          userId: res.user.id,
          chatRoomId: data.chatroom_id,
          messageId: data.id,
          message: data.message,
          sentAt: new Date()
        }
        broadcastMessage(messageToBeBroadcast);
      } catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
      }
    },

    getMessage: async (req, res) => {
      const { roomId } = req.params;
      try {
        const messages = await chatRoomService.getMessage(roomId);
        res.status(200).send({status: "OK", data: messages});
      } catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
      }
    }
}

module.exports = chatRoomController;