const express = require('express');
const router = express.Router();
const { login, signup, updateProfile, getAllUsers } = require('../controllers/authController');

router.post('/login', login);
router.post('/signup', signup);
router.put('/profile/:id', updateProfile);
router.get('/users', getAllUsers);

module.exports = router;
