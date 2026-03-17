const { prisma, serialize } = require('../lib/prisma');

const getHero = async (req, res) => {
    try {
        const data = await prisma.hero.findMany();
        res.json(serialize(data));
    } catch (error) {
        console.error("[heroController] Get hero error:", error);
        res.status(500).json({ message: "Error reading hero data" });
    }
};

const addHero = async (req, res) => {
    try {
        const newItem = await prisma.hero.create({
            data: {
                id: BigInt(Date.now()),
                ...req.body
            }
        });
        res.status(201).json(serialize(newItem));
    } catch (error) {
        console.error("[heroController] Add hero error:", error);
        res.status(500).json({ message: "Error adding hero data" });
    }
};

const updateHero = async (req, res) => {
    try {
        const updatedItem = await prisma.hero.update({
            where: { id: BigInt(req.params.id) },
            data: req.body
        });
        res.json(serialize(updatedItem));
    } catch (error) {
        console.error("[heroController] Update hero error:", error);
        res.status(500).json({ message: "Error updating hero data" });
    }
};

const deleteHero = async (req, res) => {
    try {
        await prisma.hero.delete({
            where: { id: BigInt(req.params.id) }
        });
        res.json({ message: 'Hero slide deleted' });
    } catch (error) {
        console.error("[heroController] Delete hero error:", error);
        res.status(500).json({ message: "Error deleting hero data" });
    }
};

module.exports = { getHero, addHero, updateHero, deleteHero };
