// import { createItem, readItems, readItem, updateItem, deleteItem } from '@directus/sdk';
// import collectionNames from '../utils/collectionNames.js';
// import { getDirectusClient } from '../utils/directusService.js';

const { createItem, readItems, readItem, updateItem, deleteItem } = require('@directus/sdk');
const collectionNames = require('../utils/collectionNames.js');
const { getDirectusClient } = require('../utils/directusService.js');

const directusClient = getDirectusClient();

const chatRoomService = {
    create: async (newChatRoom) => {
      try {
        return await directusClient.request(createItem(collectionNames.CHAT_ROOMS, newChatRoom));
      } catch (error) {
        throw error;
      }
    },
  
    list: async () => {
      try {
        return await directusClient.request(readItems(collectionNames.CHAT_ROOMS));
      } catch (error) {
        throw error;
      }
    },
  
    details: async (chatRoomId) => {
      try {
        return await directusClient.request(readItem(collectionNames.CHAT_ROOMS, chatRoomId));
      } catch (error) {
        throw error;
      }
    },
  
    update: async (chatRoomId, dataToUpdate) => {
      try {
        return await directusClient.request(updateItem(collectionNames.CHAT_ROOMS, chatRoomId, dataToUpdate));
      } catch (error) {
        throw error;
      }
    },
  
    delete: async (chatRoomId) => {
        try {
          return await directusClient.request(deleteItem(collectionNames.CHAT_ROOMS, chatRoomId));
        } catch (error) {
          throw error;
        }
    },

    joinChatRoom: async (roomData) => {
      try {
        // check if chat room id is valid
        const chatRoom = await directusClient.request(readItem(collectionNames.CHAT_ROOMS, roomData.chatroom_id));
        if (!chatRoom) {
          const error = new Error('Invalid chatroom Id');
          error.status = 400;
          throw error;
        }

        // check if user is already in chat room
        const userExistsInChatroom = await directusClient.request(
          readItems(collectionNames.USERS_IN_CHAT_ROOM, {
            filter: {
              chatroom_id: {
                _eq: roomData.chatroom_id,
              },
              user_id: {
                _eq: roomData.user_id,
              }
            },
          })
        );
        if (userExistsInChatroom && userExistsInChatroom.length > 0) {
          const error = new Error('User is already in the chatroom');
          error.status = 400;
          throw error;
        }
        return await directusClient.request(createItem(collectionNames.USERS_IN_CHAT_ROOM, roomData));
      } catch (error) {
        throw error;
      }
    },

    leaveChatRoom: async (roomData) => {
      try {
        const userExistsInChatroom = await directusClient.request(
          readItems(collectionNames.USERS_IN_CHAT_ROOM, {
            filter: {
              chatroom_id: {
                _eq: roomData.chatroom_id,
              },
              user_id: {
                _eq: roomData.user_id,
              },
            },
          })
        );
        if (userExistsInChatroom) {
          return await directusClient.request(deleteItem(collectionNames.USERS_IN_CHAT_ROOM, userExistsInChatroom[0].id));
        }
      } catch (error) {
        throw error;
      }
    },

    sendMessage: async (newMessage) => {
      try {
        const message = await directusClient.request(createItem(collectionNames.MESSAGES, newMessage));
        console.log('sendMessage', message);
        return message;
      } catch (error) {
        throw error;
      }
    },

    getMessage: async (chatroomId) => {
      try {
        return await directusClient.request(
          readItems(collectionNames.MESSAGES, {
            filter: {
              chatroom_id: {
                _eq: chatroomId,
              },
            },
          })
        );
      } catch (error) {
        throw error;
      }
    }
};

module.exports = chatRoomService;