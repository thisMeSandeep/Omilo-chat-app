import User from "../models/user.model.js";
import generateToken from "../config/generateToken.js";
import bcrypt from "bcryptjs";

// ---------------Register Controller--------------
export const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validate input fields
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if email is already registered
    const isEmailExists = await User.findOne({ email });
    if (isEmailExists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // Check if username is already registered
    const isUsernameExists = await User.findOne({ username: username });
    if (isUsernameExists) {
      return res
        .status(400)
        .json({ success: false, message: "username already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Update online status and name to username initially
    await User.findByIdAndUpdate(newUser._id, {
      $set: { online: true, name: newUser.username },
    });

    // Fetch user  and exclude password
    const user = await User.findById(newUser._id).select("-password");

    // Generate jwt token
    await generateToken(newUser._id, res);

    // Send success
    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: user,
    });
  } catch (err) {
    console.error("Error in registration:", err.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// ---------------------Login controller--------------
export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check for email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Get user
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found , check your email",
      });
    }

    // Match password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Password didn't match",
      });
    }

    // Update online status and name to username initially
    await User.findByIdAndUpdate(user._id, {
      $set: { online: true, name: user.username },
    });

    // Fetch user  and exclude password
    user = await User.findById(user._id).select("-password");

    // Generate token and set in cookie
    await generateToken(user._id, res);

    // Return user data (excluding password)
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: user,
    });
  } catch (err) {
    console.log("Error in login:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// -------------------Logout Controller--------------
export const logoutController = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return res.status(200).json({
      success: true,
      message: "Logout Successful",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// --------------------get user information----------------

export const getUserDataController = async (req, res) => {
  const userId = req.id;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User data found",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
