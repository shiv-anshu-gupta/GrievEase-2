import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false, timestamps: true }
);

const chatSchema = new mongoose.Schema(
  {
    complaintId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      required: true,
    },
    citizenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    officerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
