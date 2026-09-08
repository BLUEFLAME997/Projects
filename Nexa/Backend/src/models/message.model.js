import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // human user OR the AI's synthetic user ID
      required: true,
    },

    text: {
      type: String,
      trim: true,
    },

    attachments: [
      {
        url: { type: String, required: true },
        type: {
          type: String,
          enum: ["image", "video", "file", "audio"],
        },
        size: { type: Number }, // in bytes, optional
      },
    ],

    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },

    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    isEdited: {
      type: Boolean,
      default: false,
    },
    editedAt: {
      type: Date,
    },

    isDeleted: {
      type: Boolean,
      default: false, 
    },
    deletedFor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
      },
    ],

    isAIGenerated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } 
);

messageSchema.index({ conversationId: 1, createdAt: -1 });

const messageModel = mongoose.model("Message", messageSchema);

export default messageModel;