import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
  
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  },

  fileFilter: (req, res) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(req.file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and WEBP images are allowed'), false);
    }
  }

})

export default upload;
