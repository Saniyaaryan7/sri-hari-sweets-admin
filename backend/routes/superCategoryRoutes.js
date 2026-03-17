const express = require('express');
const router = express.Router();
const superCategoryController = require('../controllers/superCategoryController');

router.get('/', superCategoryController.getAllSuperCategories);
router.post('/', superCategoryController.createSuperCategory);
router.put('/:id', superCategoryController.updateSuperCategory);
router.delete('/:id', superCategoryController.deleteSuperCategory);

module.exports = router;
