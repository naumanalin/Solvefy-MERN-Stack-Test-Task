import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Use /tmp directory for Vercel compatibility
const uploadPath = '/tmp/uploads';

// Create directory if it doesn't exist
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname).toLowerCase();
        const baseName = path.basename(file.originalname, fileExtension);
        cb(null, baseName + '-' + uniqueSuffix + fileExtension);
    }
});

// Allowed file types
const allowedTypes = {
    images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

// File filter function
const fileFilter = (req, file, cb) => {
    if (allowedTypes.images.includes(file.mimetype) || allowedTypes.documents.includes(file.mimetype)) {
        return cb(null, true);
    }
    cb(new Error('Invalid file type. Only JPG, PNG, GIF, WEBP, PDF, DOC, and DOCX are allowed.'));
};

// File size limits (2MB for images, 5MB for documents)
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024  // Max file size: 5MB
    }
});

// Export the upload middleware
export default upload;
