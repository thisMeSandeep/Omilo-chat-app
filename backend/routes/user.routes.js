import express from "express";
import {
  getUserDataController,
  loginController,
  logoutController,
  registerController,
  updateUserController,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(registerController); //register user
userRouter.route("/login").post(loginController); //login user
userRouter.route("/logout").post(logoutController); //logout controller
userRouter.route("/get-user-data").get(authMiddleware, getUserDataController); //get user data
userRouter.route("/update-user").put(authMiddleware, updateUserController); //update user data

export default userRouter;
