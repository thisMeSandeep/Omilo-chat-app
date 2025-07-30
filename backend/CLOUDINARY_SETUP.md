# Cloudinary Setup Guide

## 1. Install Dependencies
```bash
pnpm add cloudinary
```

## 2. Environment Variables
Add these to your `.env` file:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 3. Get Cloudinary Credentials
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to your Dashboard
3. Copy your Cloud Name, API Key, and API Secret

## 4. Features Included

### Profile Picture Upload
- **Route**: `PUT /api/users/update-profile-picture`
- **File Types**: Images only (JPG, PNG, GIF, etc.)
- **Size Limit**: 10MB
- **Transformations**: 
  - Resized to 400x400px
  - Face detection for better cropping
  - Auto quality optimization

### Chat Media Upload (Future)
- **Images**: Up to 10MB
- **Videos**: Up to 50MB  
- **Documents**: Up to 20MB
- **Auto-optimization**: Quality and format optimization

## 5. File Structure in Cloudinary
```
chat-app/
├── profiles/          # Profile pictures
├── media/
│   ├── images/       # Chat images
│   ├── videos/       # Chat videos
│   └── files/        # Chat documents
```

## 6. Usage Examples

### Frontend - Profile Picture Upload
```javascript
const formData = new FormData();
formData.append('profilePic', file);

const response = await fetch('/api/users/update-profile-picture', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

### Backend - Upload Chat Media
```javascript
import { uploadChatMedia } from '../config/cloudinary.js';

const result = await uploadChatMedia(file, 'image');
// Returns: { url, public_id, format, size }
```

## 7. Benefits
- ✅ **CDN**: Fast global delivery
- ✅ **Optimization**: Auto image/video optimization
- ✅ **Transformations**: On-the-fly resizing and cropping
- ✅ **Security**: Secure URLs and access control
- ✅ **Storage**: No local storage needed
- ✅ **Backup**: Automatic backup and versioning 