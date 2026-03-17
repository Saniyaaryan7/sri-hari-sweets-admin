const { prisma, serialize } = require('../lib/prisma');

const getAbout = async (req, res) => {
    try {
        const data = await prisma.about.findUnique({
            where: { id: 1 }
        });
        res.json(serialize(data));
    } catch (error) {
        console.error("[aboutController] Get error:", error);
        res.status(500).json({ message: "Error reading about data" });
    }
};

const updateAbout = async (req, res) => {
    try {
        const updatedData = await prisma.about.upsert({
            where: { id: 1 },
            update: req.body,
            create: { id: 1, ...req.body }
        });
        res.json(serialize(updatedData));
    } catch (error) {
        console.error("[aboutController] Update error:", error);
        res.status(500).json({ message: "Error saving about data" });
    }
};

module.exports = { getAbout, updateAbout };
