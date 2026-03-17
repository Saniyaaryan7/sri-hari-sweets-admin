const express = require('express');
const router = express.Router();
const { getGallery, addGalleryImage, deleteGalleryImage } = require('../controllers/galleryController');

router.get('/', getGallery);
router.post('/', addGalleryImage);
router.delete('/:id', deleteGalleryImage);

module.exports = router;
