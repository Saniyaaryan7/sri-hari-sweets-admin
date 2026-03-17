const { prisma, serialize } = require('../lib/prisma');

const getCart = async (req, res) => {
    const userId = req.headers['user-id'];
    if (!userId) return res.status(400).json({ message: "User ID required" });

    try {
        const cart = await prisma.cart.findUnique({
            where: { userId: String(userId) }
        });
        res.json(serialize(cart ? cart.items : []));
    } catch (error) {
        console.error("[cartController] Get cart error:", error);
        res.status(500).json({ message: "Error reading cart data" });
    }
};

const updateCart = async (req, res) => {
    const userId = req.headers['user-id'];
    const { items } = req.body;
    if (!userId) return res.status(400).json({ message: "User ID required" });

    try {
        const updatedCart = await prisma.cart.upsert({
            where: { userId: String(userId) },
            update: { items },
            create: { userId: String(userId), items }
        });
        res.json(serialize(updatedCart.items));
    } catch (error) {
        console.error("[cartController] Update cart error:", error);
        res.status(500).json({ message: "Error saving cart data" });
    }
};

module.exports = { getCart, updateCart };
