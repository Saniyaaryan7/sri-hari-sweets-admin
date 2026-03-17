const { prisma, serialize } = require('../lib/prisma');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        
        if (user && user.password === password) {
            const { password, ...userWithoutPassword } = user;
            res.json(serialize(userWithoutPassword));
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("[authController] Login error:", error);
        res.status(500).json({ message: "Error during login" });
    }
};

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        const newUser = await prisma.user.create({
            data: { name, email, password, role: 'user' }
        });
        
        const { password: pw, ...userWithoutPassword } = newUser;
        res.status(201).json(serialize(userWithoutPassword));
    } catch (error) {
        console.error("[authController] Signup error:", error);
        res.status(500).json({ message: "Error during signup" });
    }
};

const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { name, email, role, currentPassword, newPassword, image } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { id: BigInt(id) } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const data = {};
        if (newPassword) {
            if (user.password !== currentPassword) {
                return res.status(400).json({ message: "Current password does not match" });
            }
            data.password = newPassword;
        }

        if (name) data.name = name;
        if (email) data.email = email;
        if (role) data.role = role;
        if (image) data.image = image;

        const updatedUser = await prisma.user.update({
            where: { id: BigInt(id) },
            data
        });

        const { password, ...userWithoutPassword } = updatedUser;
        res.json(serialize(userWithoutPassword));
    } catch (error) {
        console.error(`[authController] Error updating profile:`, error);
        res.status(500).json({ message: "Error updating profile" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        const usersWithoutPasswords = users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
        res.json(serialize(usersWithoutPasswords));
    } catch (error) {
        console.error("[authController] Get all users error:", error);
        res.status(500).json({ message: "Error reading user data" });
    }
};

module.exports = { login, signup, updateProfile, getAllUsers };
