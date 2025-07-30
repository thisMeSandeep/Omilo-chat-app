import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      index: true, 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      index: true, 
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    name: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 50,
      default: null,
    },
    profilePic: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/10337/10337609.png",
      trim: true,
    },
    profilePicPublicId: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer-not-to-say"],
      default: "prefer-not-to-say",
    },
    dob: {
      type: Date,
      default: null,
    },
    dobVisible: {
      type: Boolean,
      default: true,
    },
    country: {
      type: String,
      trim: true,
      default: null,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 160,
      default: "",
    },
    online: {
      type: Boolean,
      default: false,
      index: true, 
    },
    lastSeen: {
      type: Date,
      default: null,
    },
    lastSeenVisible: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "banned"],
      default: "active",
      index: true,
    },
    privateAccount: {
      type: Boolean,
      default: false,
    },
    // Keep ObjectId references - better than strings
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    blockedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  // removes password from JSON responses
    toJSON: {
      transform: function(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

// Keep only essential compound index
userSchema.index({ status: 1, online: 1 });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
