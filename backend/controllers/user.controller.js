import User from "../models/user.model.js";
import generateToken from "../config/generateToken.js";
import bcrypt from "bcryptjs";
import upload from "../config/multer.js";
import { uploadProfilePicture as uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";

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


//--------------------update user details------------------
export const updateUserController = async (req, res) => {
  try {
    const userId = req.id;
    const updates = req.body;
    
    // Define allowed fields that can be updated
    const allowedFields = [
      'name', 'bio', 'gender', 'dob', 'dobVisible', 
      'country', 'lastSeenVisible', 'privateAccount'
    ];
    
    // Filter out non-allowed fields for security
    const filteredUpdates = {};
    Object.keys(updates).forEach(key => {
      if (allowedFields.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    });
    
    // Validate specific fields
    if (filteredUpdates.name && (filteredUpdates.name.length < 2 || filteredUpdates.name.length > 50)) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 2 and 50 characters"
      });
    }
    
    if (filteredUpdates.bio && filteredUpdates.bio.length > 160) {
      return res.status(400).json({
        success: false,
        message: "Bio must be 160 characters or less"
      });
    }
    
    if (filteredUpdates.gender && !['male', 'female', 'other', 'prefer-not-to-say'].includes(filteredUpdates.gender)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gender selection"
      });
    }
    
    // Validate date of birth
    if (filteredUpdates.dob) {
      const dob = new Date(filteredUpdates.dob);
      if (isNaN(dob.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid date of birth format"
        });
      }
      
      // Check if user is at least 13 years old
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      
      if (age < 13) {
        return res.status(400).json({
          success: false,
          message: "You must be at least 13 years old"
        });
      }
    }
    
    // Update user with filtered data
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      filteredUpdates, 
      { 
        new: true,
        runValidators: true // Run schema validators
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validationErrors
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Internal server error." 
    });
  }
};

//--------------------update profile picture------------------
export const updateProfilePictureController = async (req, res) => {
  try {
    const userId = req.id;
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided"
      });
    }
    
    // Get current user to check if they have an existing profile picture
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    // Upload new profile picture to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(req.file);
    
    // Update user's profile picture with Cloudinary URL
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        profilePic: cloudinaryResult.url,
        // Store Cloudinary public_id for future deletion if needed
        profilePicPublicId: cloudinaryResult.public_id 
      },
      { new: true }
    ).select("-password");
    
    // Delete old profile picture from Cloudinary if it exists and is different
    if (currentUser.profilePicPublicId && 
        currentUser.profilePicPublicId !== cloudinaryResult.public_id &&
        !currentUser.profilePic.includes('flaticon.com')) { // Don't delete default image
      try {
        await deleteFromCloudinary(currentUser.profilePicPublicId);
      } catch (deleteError) {
        console.error('Error deleting old profile picture:', deleteError);
        // Don't fail the request if deletion fails
      }
    }
    
    res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      user: updatedUser
    });
    
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};
