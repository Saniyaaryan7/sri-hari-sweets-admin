const { prisma, serialize } = require('../lib/prisma');

exports.getAllCakes = async (req, res) => {
    try {
        const cakes = await prisma.cake.findMany();
        res.json(serialize(cakes));
    } catch (error) {
        console.error("[cakeController] Get all cakes error:", error);
        res.status(500).json({ message: "Error reading cakes data" });
    }
};

exports.getCakeById = async (req, res) => {
    try {
        const cake = await prisma.cake.findUnique({
            where: { id: BigInt(req.params.id) }
        });
        if (!cake) return res.status(404).json({ message: "Cake not found" });
        res.json(serialize(cake));
    } catch (error) {
        console.error("[cakeController] Get cake by ID error:", error);
        res.status(500).json({ message: "Error reading cake data" });
    }
};

exports.createCake = async (req, res) => {
    try {
        const { cakeId, name, price, strike, image, status } = req.body;
        const newCake = await prisma.cake.create({
            data: {
                id: BigInt(Date.now()),
                cakeId,
                name,
                price: parseFloat(price),
                strike: strike ? parseFloat(strike) : null,
                image,
                status: status || 'Active'
            }
        });
        res.status(201).json(serialize(newCake));
    } catch (error) {
        console.error("[cakeController] Create cake error:", error);
        res.status(500).json({ message: "Error adding cake" });
    }
};

exports.updateCake = async (req, res) => {
    try {
        const { price, strike, ...otherData } = req.body;
        const data = { ...otherData };
        if (price) data.price = parseFloat(price);
        if (strike) data.strike = parseFloat(strike);

        const updatedCake = await prisma.cake.update({
            where: { id: BigInt(req.params.id) },
            data
        });
        res.json(serialize(updatedCake));
    } catch (error) {
        console.error("[cakeController] Update cake error:", error);
        res.status(500).json({ message: "Error updating cake" });
    }
};

exports.deleteCake = async (req, res) => {
    try {
        await prisma.cake.delete({
            where: { id: BigInt(req.params.id) }
        });
        res.status(204).send();
    } catch (error) {
        console.error("[cakeController] Delete cake error:", error);
        res.status(500).json({ message: "Error deleting cake" });
    }
};
