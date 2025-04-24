import Chat from "../models/chat.model.js";

export const chatSocketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join room (one room per complaint)
    socket.on("joinRoom", (complaintId) => {
      socket.join(complaintId);
      console.log(`Socket ${socket.id} joined room ${complaintId}`);
    });

    // Handle message send
    socket.on("sendMessage", async (data) => {
      try {
        const { complaintId, citizenId, officerId, senderId, message } = data;

        if (!complaintId || !citizenId || !officerId || !senderId || !message) {
          console.error("Missing fields in chat message data");
          return;
        }

        // Find existing chat by complaintId
        let chat = await Chat.findOne({ complaintId });

        if (!chat) {
          // Create new chat if not exists
          chat = new Chat({
            complaintId,
            citizenId,
            officerId,
            messages: [{ senderId, message }],
          });
        } else {
          // Push new message into existing chat
          chat.messages.push({ senderId, message });
        }

        await chat.save();

        io.to(complaintId.toString()).emit("newMessage", {
          senderId,
          message,
          timestamp: new Date(),
        });
      } catch (error) {
        console.error("Error saving chat message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
