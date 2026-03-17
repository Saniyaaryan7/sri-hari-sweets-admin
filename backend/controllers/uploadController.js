const multer = require('multer');

// Configure storage in memory
const storage = multer.memoryStorage();

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
  
  // Convert buffer to Base64 data string
  const base64Data = req.file.buffer.toString('base64');
  const dataUri = `data:${req.file.mimetype};base64,${base64Data}`;
  
  res.json({ 
    message: "File converted to data string successfully",
    path: dataUri 
  });
};

module.exports = { upload, uploadImage };
