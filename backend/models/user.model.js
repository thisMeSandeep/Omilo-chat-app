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
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
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
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer-not-to-say"],
      default: "prefer-not-to-say",
    },
    dob: {
      date: {
        type: Date,
        default: null,
      },
      visible: {
        type: Boolean,
        default: true,
      },
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
    },
    lastSeen: {
      date: {
        type: Date,
        default: null,
      },
      visible: {
        type: Boolean,
        default: true,
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "banned"],
      default: "active",
    },
    privateAccount: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: String,
      },
    ],
    blockedUsers: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.user || mongoose.model("User", userSchema);

export default User;
