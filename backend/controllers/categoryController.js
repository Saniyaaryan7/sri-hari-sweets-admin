const { prisma, serialize } = require('../lib/prisma');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(serialize(categories));
    } catch (error) {
        console.error("[categoryController] Get all categories error:", error);
        res.status(500).json({ message: "Error reading categories data" });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name, superCategory, image, status } = req.body;
        const newCategory = await prisma.category.create({
            data: {
                id: BigInt(Date.now()),
                name,
                superCategory,
                image,
                status: status || 'Active'
            }
        });
        res.status(201).json(serialize(newCategory));
    } catch (error) {
        console.error("[categoryController] Create category error:", error);
        res.status(500).json({ message: "Error adding category" });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await prisma.category.update({
            where: { id: BigInt(req.params.id) },
            data: req.body
        });
        res.json(serialize(updatedCategory));
    } catch (error) {
        console.error("[categoryController] Update category error:", error);
        res.status(500).json({ message: "Error updating category" });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await prisma.category.delete({
            where: { id: BigInt(req.params.id) }
        });
        res.status(204).send();
    } catch (error) {
        console.error("[categoryController] Delete category error:", error);
        res.status(500).json({ message: "Error deleting category" });
    }
};
