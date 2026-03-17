const { prisma, serialize } = require('../lib/prisma');

const getContact = async (req, res) => {
    try {
        const data = await prisma.contact.findUnique({
            where: { id: 1 }
        });
        res.json(serialize(data));
    } catch (error) {
        console.error("[contactController] Get error:", error);
        res.status(500).json({ message: "Error reading contact data" });
    }
};

const updateContact = async (req, res) => {
    try {
        const updatedData = await prisma.contact.upsert({
            where: { id: 1 },
            update: req.body,
            create: { id: 1, ...req.body }
        });
        res.json(serialize(updatedData));
    } catch (error) {
        console.error("[contactController] Update error:", error);
        res.status(500).json({ message: "Error updating contact data" });
    }
};

module.exports = { getContact, updateContact };
