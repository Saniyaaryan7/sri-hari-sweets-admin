const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure storage on disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'public', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(file.originalname.toLowerCase().split('.').pop());

    if (mimetype || extname) {
      return cb(null, true);
    }
    cb(new Error("Only images (.jpeg, .jpg, .png, .webp) are allowed!"));
  }
});

const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload a file" });
  }
  
  // Return the relative URL path
  const filePath = `/public/uploads/${req.file.filename}`;
  
  res.json({ 
    message: "File uploaded successfully",
    path: filePath 
  });
};

module.exports = { upload, uploadImage };
