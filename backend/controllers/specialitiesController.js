const { prisma, serialize } = require('../lib/prisma');

const getSpecialities = async (req, res) => {
    try {
        const data = await prisma.speciality.findMany();
        res.json(serialize(data));
    } catch (error) {
        console.error("[specialitiesController] Get error:", error);
        res.status(500).json({ message: "Error reading specialities data" });
    }
};

const addSpeciality = async (req, res) => {
    try {
        const newItem = await prisma.speciality.create({
            data: {
                id: BigInt(Date.now()),
                ...req.body
            }
        });
        res.status(201).json(serialize(newItem));
    } catch (error) {
        console.error("[specialitiesController] Add error:", error);
        res.status(500).json({ message: "Error adding speciality" });
    }
};

const updateSpeciality = async (req, res) => {
    try {
        const updatedItem = await prisma.speciality.update({
            where: { id: BigInt(req.params.id) },
            data: req.body
        });
        res.json(serialize(updatedItem));
    } catch (error) {
        console.error("[specialitiesController] Update error:", error);
        res.status(500).json({ message: "Error updating speciality" });
    }
};

const deleteSpeciality = async (req, res) => {
    try {
        await prisma.speciality.delete({
            where: { id: BigInt(req.params.id) }
        });
        res.json({ message: 'Deleted' });
    } catch (error) {
        console.error("[specialitiesController] Delete error:", error);
        res.status(500).json({ message: "Error deleting speciality" });
    }
};

module.exports = { getSpecialities, addSpeciality, updateSpeciality, deleteSpeciality };
