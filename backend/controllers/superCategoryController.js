const { prisma, serialize } = require('../lib/prisma');

exports.getAllSuperCategories = async (req, res) => {
    try {
        const superCategories = await prisma.superCategory.findMany();
        res.json(serialize(superCategories));
    } catch (error) {
        console.error("[superCategoryController] Get all error:", error);
        res.status(500).json({ message: "Error reading supercategories data" });
    }
};

exports.createSuperCategory = async (req, res) => {
    try {
        const { name, image, status } = req.body;
        const newSuperCategory = await prisma.superCategory.create({
            data: {
                id: BigInt(Date.now()),
                name,
                image,
                status: status || 'Active'
            }
        });
        res.status(201).json(serialize(newSuperCategory));
    } catch (error) {
        console.error("[superCategoryController] Create error:", error);
        res.status(500).json({ message: "Error adding supercategory" });
    }
};

exports.updateSuperCategory = async (req, res) => {
    try {
        const updatedSuperCategory = await prisma.superCategory.update({
            where: { id: BigInt(req.params.id) },
            data: req.body
        });
        res.json(serialize(updatedSuperCategory));
    } catch (error) {
        console.error("[superCategoryController] Update error:", error);
        res.status(500).json({ message: "Error updating supercategory" });
    }
};

exports.deleteSuperCategory = async (req, res) => {
    try {
        await prisma.superCategory.delete({
            where: { id: BigInt(req.params.id) }
        });
        res.status(204).send();
    } catch (error) {
        console.error("[superCategoryController] Delete error:", error);
        res.status(500).json({ message: "Error deleting supercategory" });
    }
};
