import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: String, // Array of user _id as strings
      required: true, // Ensure at least one participant
    },
  ],
  groupChat: {
    type: Boolean,
    default: false, // False = 1-to-1, true = group
  },
  groupName: {
    type: String,
    trim: true,
    default: null, // Optional, for group chats
  },
  groupPic: {
    type: String,
    trim: true,
    default: null, // Optional, URL for group chats
  },
  groupBio: {
    type: String,
    trim: true,
    default: null, // Optional, for group chats
  },
  groupAdmin: [
    {
      type: String, // Array of admin user _id as strings, optional
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
