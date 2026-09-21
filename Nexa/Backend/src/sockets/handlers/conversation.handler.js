import { checkConversationService } from "../../services/conversatoin.service.js";

const roomName = (id) => {
  return `conversation:${id}`
}

export function requestToJoinRoomHandler(io, socket) {
  socket.on('conversation:join', async (conversationId, callback) => {
    try {
      if (!conversationId) {
        return callback({
          status: 'rejected',
          message: 'Conversation Id not provided'
        })
      }

      const result = await checkConversationService(conversationId, socket.user.id);
      
      if (result.status === false) {
        return callback({
          status: 'rejected',
          message: result.message
        })
      }

      await socket.join(roomName(conversationId));
      io.to(roomName(conversationId))
        .emit('conversation:user_joined', {
          UserId: socket.user.id,
          message:"User joined successfully in the room"
        })

      callback({
        status: 'accepted',
        message: 'User joined room successfully',
        conversationId
      });
    } catch (err) {

      callback({
        status: 'rejected',
        message: 'Something went wrong'
      })
    }

  })
}