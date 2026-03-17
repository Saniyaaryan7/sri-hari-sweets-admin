const express = require('express');
const router = express.Router();
const { getHero, addHero, updateHero, deleteHero } = require('../controllers/heroController');

router.get('/', getHero);
router.post('/', addHero);
router.put('/:id', updateHero);
router.delete('/:id', deleteHero);

module.exports = router;
