import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chatId: {
    type: Schema.Types.ObjectId, // Links to Chat _id
    required: true, // Must link to a chat
  },
  sender: {
    type: String, // User _id as string
    required: true, // Must have a sender
  },
  message: {
    type: String,
    trim: true,
    default: null, // Null if media
  },
  messageType: {
    type: String,
    enum: ["text", "image", "video", "file"],
    required: true, // Must specify type
  },
  mediaUrl: {
    type: String,
    trim: true,
    default: null, // Optional, for media
  },
  seenBy: [
    {
      type: String, // Array of user _id as strings
    },
  ],
  deleted: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
