const express = require('express');
const router = express.Router();
const { upload, uploadImage } = require('../controllers/uploadController');

// Upload a single image
router.post('/', upload.single('image'), (req, res, next) => {
    // Basic error handling for multer
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded or invalid file type." });
    }
    next();
}, uploadImage);

module.exports = router;
