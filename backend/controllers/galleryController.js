const { prisma, serialize } = require('../lib/prisma');

const getGallery = async (req, res) => {
    try {
        const data = await prisma.gallery.findMany();
        res.json(serialize(data));
    } catch (error) {
        console.error("[galleryController] Get gallery error:", error);
        res.status(500).json({ message: "Error reading gallery data" });
    }
};

const addGalleryImage = async (req, res) => {
    try {
        const newItem = await prisma.gallery.create({
            data: {
                id: BigInt(Date.now()),
                ...req.body
            }
        });
        res.status(201).json(serialize(newItem));
    } catch (error) {
        console.error("[galleryController] Add gallery image error:", error);
        res.status(500).json({ message: "Error adding gallery data" });
    }
};

const deleteGalleryImage = async (req, res) => {
    try {
        await prisma.gallery.delete({
            where: { id: BigInt(req.params.id) }
        });
        res.json({ message: 'Gallery image deleted' });
    } catch (error) {
        console.error("[galleryController] Delete gallery image error:", error);
        res.status(500).json({ message: "Error deleting gallery data" });
    }
};

module.exports = { getGallery, addGalleryImage, deleteGalleryImage };
