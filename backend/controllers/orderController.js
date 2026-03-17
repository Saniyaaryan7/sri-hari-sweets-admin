const { prisma, serialize } = require('../lib/prisma');

const placeOrder = async (req, res) => {
    const userId = req.headers['user-id'];
    const { items, address, total, paymentMethod } = req.body;
    
    if (!userId) return res.status(400).json({ message: "User ID required" });

    try {
        const newOrder = await prisma.order.create({
            data: {
                id: BigInt(Date.now()),
                userId: String(userId),
                items,
                address,
                total: parseFloat(total),
                paymentMethod,
                status: 'Pending'
            }
        });

        // Clear user's cart after order placement
        await prisma.cart.update({
            where: { userId: String(userId) },
            data: { items: [] }
        }).catch(() => {
            // If cart doesn't exist, ignore
            console.log(`[orderController] No cart found for user ${userId} to clear`);
        });

        res.status(201).json(serialize(newOrder));
    } catch (error) {
        console.error("[orderController] Place order error:", error);
        res.status(500).json({ message: "Error placing order" });
    }
};

const getUserOrders = async (req, res) => {
    const userId = req.headers['user-id'];
    if (!userId) return res.status(400).json({ message: "User ID required" });

    try {
        const orders = await prisma.order.findMany({
            where: { userId: String(userId) }
        });
        res.json(serialize(orders));
    } catch (error) {
        console.error("[orderController] Get user orders error:", error);
        res.status(500).json({ message: "Error fetching user orders" });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany();
        res.json(serialize(orders));
    } catch (error) {
        console.error("[orderController] Get all orders error:", error);
        res.status(500).json({ message: "Error fetching orders" });
    }
};

const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedOrder = await prisma.order.update({
            where: { id: BigInt(id) },
            data: { status }
        });
        res.json(serialize(updatedOrder));
    } catch (error) {
        console.error("[orderController] Update status error:", error);
        res.status(500).json({ message: "Error updating order status" });
    }
};

module.exports = { placeOrder, getUserOrders, getAllOrders, updateOrderStatus };
