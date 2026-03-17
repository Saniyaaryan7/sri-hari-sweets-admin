const express = require('express');
const router = express.Router();
const { placeOrder, getUserOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');

router.post('/', placeOrder);
router.get('/user', getUserOrders);
router.get('/admin', getAllOrders);
router.put('/:id/status', updateOrderStatus);

module.exports = router;
