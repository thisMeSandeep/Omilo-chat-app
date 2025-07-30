import { v2 as cloudinary } from 'cloudinary';


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload image to Cloudinary
export const uploadToCloudinary = async (file, folder = 'chat-app') => {
  try {
    // Convert buffer to base64
    const b64 = Buffer.from(file.buffer).toString('base64');
    const dataURI = `data:${file.mimetype};base64,${b64}`;
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: folder,
      resource_type: 'auto',
      transformation: [
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });
    
    return {
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      size: result.bytes
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload file to Cloudinary');
  }
};

// Helper function to delete file from Cloudinary
export const deleteFromCloudinary = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete file from Cloudinary');
  }
};

// Helper function to upload profile picture with specific transformations
export const uploadProfilePicture = async (file) => {
  try {
    const b64 = Buffer.from(file.buffer).toString('base64');
    const dataURI = `data:${file.mimetype};base64,${b64}`;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'chat-app/profiles',
      resource_type: 'image',
      transformation: [
        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });
    
    return {
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      size: result.bytes
    };
  } catch (error) {
    console.error('Profile picture upload error:', error);
    throw new Error('Failed to upload profile picture');
  }
};

// Helper function to upload chat media
export const uploadChatMedia = async (file, type = 'image') => {
  try {
    const b64 = Buffer.from(file.buffer).toString('base64');
    const dataURI = `data:${file.mimetype};base64,${b64}`;
    
    let folder = 'chat-app/media';
    let transformations = [];
    
    if (type === 'image') {
      folder = 'chat-app/media/images';
      transformations = [
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ];
    } else if (type === 'video') {
      folder = 'chat-app/media/videos';
      transformations = [
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ];
    } else {
      folder = 'chat-app/media/files';
    }
    
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: folder,
      resource_type: 'auto',
      transformation: transformations
    });
    
    return {
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      size: result.bytes,
      duration: result.duration // for videos
    };
  } catch (error) {
    console.error('Chat media upload error:', error);
    throw new Error('Failed to upload media file');
  }
};

export default cloudinary; 