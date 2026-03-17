const express = require('express');
const router = express.Router();
const { getSpecialities, addSpeciality, updateSpeciality, deleteSpeciality } = require('../controllers/specialitiesController');

router.get('/', getSpecialities);
router.post('/', addSpeciality);
router.put('/:id', updateSpeciality);
router.delete('/:id', deleteSpeciality);

module.exports = router;
