import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  groupChat: {
    type: Boolean,
    default: false,
  },
  groupName: {
    type: String,
    trim: true,
    default: null,
  },
  groupPic: {
    type: String,
    trim: true,
    default: null,
  },
  groupBio: {
    type: String,
    trim: true,
    default: null,
  },
  // Keep ObjectId references for admins
  groupAdmin: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  // Keep last message info - useful for chat previews
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    default: null,
  },
  lastMessageTime: {
    type: Date,
    default: null,
    index: true, // essential for sorting chats
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
  //  cleaner JSON output
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
});

// Keep only essential compound index
chatSchema.index({ participants: 1, groupChat: 1 });

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
