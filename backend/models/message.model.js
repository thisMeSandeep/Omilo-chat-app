import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: true,
    index: true, //  essential for message queries
  },
  // Keep ObjectId reference for sender
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true, // essential for sender queries
  },
  message: {
    type: String,
    trim: true,
    default: null,
  },
  messageType: {
    type: String,
    enum: ["text", "image", "video", "file"],
    required: true,
  },
  mediaUrl: {
    type: String,
    trim: true,
    default: null,
  },
  // Simplified seenBy - just array of user IDs
  seenBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  deleted: {
    type: Boolean,
    default: false,
    index: true, //  essential for filtering deleted messages
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true, // essential for chronological sorting
  },
}, {
  timestamps: true,
  // cleaner JSON output
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
});

// Keep only essential compound indexes
messageSchema.index({ chatId: 1, timestamp: -1 });
messageSchema.index({ chatId: 1, deleted: 1 });

const Message = mongoose.model("Message", messageSchema);

export default Message;
