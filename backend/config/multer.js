import multer from "multer";

// Use memory storage for Cloudinary (no disk storage needed)
const storage = multer.memoryStorage();

// File filter for images and files
const fileFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype.startsWith("image/")) {
    // Check file size (10MB limit for images)
    if (file.size <= 10 * 1024 * 1024) {
      cb(null, true);
    } else {
      cb(new Error("Image file size too large. Maximum size is 10MB."), false);
    }
  } else if (file.mimetype.startsWith("video/")) {
    // Check file size (50MB limit for videos)
    if (file.size <= 50 * 1024 * 1024) {
      cb(null, true);
    } else {
      cb(new Error("Video file size too large. Maximum size is 50MB."), false);
    }
  } else if (file.mimetype.startsWith("application/") || file.mimetype.startsWith("text/")) {
    // Check file size (20MB limit for documents)
    if (file.size <= 20 * 1024 * 1024) {
      cb(null, true);
    } else {
      cb(new Error("File size too large. Maximum size is 20MB."), false);
    }
  } else {
    cb(new Error("Unsupported file type!"), false);
  }
};

// Create multer instance with memory storage
const upload = multer({ 
  storage, 
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit (for videos)
  }
});

// Middleware for single file upload (profile picture)
export const uploadProfilePicture = upload.single('profilePic');

// Middleware for single file upload (chat media)
export const uploadChatMedia = upload.single('media');


export default upload;
