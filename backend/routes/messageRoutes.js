const express = require('express');
const router = express.Router();
const { getMessages, addMessage, deleteMessage, sendReply } = require('../controllers/messageController');

router.get('/', getMessages);
router.post('/', addMessage);
router.post('/reply', sendReply);
router.delete('/:id', deleteMessage);

module.exports = router;
