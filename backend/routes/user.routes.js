import express from "express";
import {
  getUserDataController,
  loginController,
  logoutController,
  registerController,
  updateUserController,
  updateProfilePictureController,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { uploadProfilePicture } from "../config/multer.js";
import multer from "multer";

const userRouter = express.Router();

// Error handling middleware for multer
const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum size is 10MB for images, 50MB for videos."
      });
    }
  } else if (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  next();
};

userRouter.route("/register").post(registerController); //register user
userRouter.route("/login").post(loginController); //login user
userRouter.route("/logout").post(logoutController); //logout controller
userRouter.route("/get-user-data").get(authMiddleware, getUserDataController); //get user data
userRouter.route("/update-user").put(authMiddleware, updateUserController); //update user data
userRouter.route("/update-profile-picture").put(authMiddleware, uploadProfilePicture, handleMulterError, updateProfilePictureController); //update profile picture

export default userRouter;
