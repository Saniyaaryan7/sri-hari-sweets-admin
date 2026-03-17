const { prisma, serialize } = require('../lib/prisma');
const nodemailer = require('nodemailer');

// Configure Email Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const getMessages = async (req, res) => {
    try {
        const data = await prisma.message.findMany();
        res.json(serialize(data));
    } catch (error) {
        console.error("[messageController] Get messages error:", error);
        res.status(500).json({ message: "Error reading messages data" });
    }
};

const addMessage = async (req, res) => {
    try {
        const newItem = await prisma.message.create({
            data: {
                id: BigInt(Date.now()),
                ...req.body
            }
        });

        // Send Direct Email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'chandansharma69217@gmail.com', // Admin contact
            subject: `New Contact Message from ${req.body.name}`,
            text: `You have a new message from ${req.body.name} (${req.body.email}):\n\n"${req.body.message}"`
        };

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                await transporter.sendMail(mailOptions);
                console.log("Email sent successfully");
            } catch (error) {
                console.error("Error sending email:", error);
            }
        }

        res.status(201).json(serialize(newItem));
    } catch (error) {
        console.error("[messageController] Add message error:", error);
        res.status(500).json({ message: "Error saving message" });
    }
};

const sendReply = async (req, res) => {
    const { id, email, name, message, replyMessage } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Re: Your Inquiry to Sri Hari Sweets`,
        text: `Hello ${name},\n\nThank you for reaching out. In response to your message: "${message}"\n\n${replyMessage}\n\nBest regards,\nSri Hari Sweets Team`
    };

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
            await transporter.sendMail(mailOptions);
            
            // Persist the reply in the database
            const updatedMessage = await prisma.message.update({
                where: { id: BigInt(id) },
                data: {
                    reply: {
                        message: replyMessage,
                        sentAt: new Date().toISOString()
                    }
                }
            });

            res.json({ success: true, message: 'Reply sent successfully', data: serialize(updatedMessage) });
        } catch (error) {
            console.error("Error sending reply email:", error);
            res.status(500).json({ success: false, message: 'Failed to send reply email' });
        }
    } else {
        res.status(500).json({ success: false, message: 'Email configuration missing on server' });
    }
};

const deleteMessage = async (req, res) => {
    try {
        await prisma.message.delete({
            where: { id: BigInt(req.params.id) }
        });
        res.json({ message: 'Message deleted' });
    } catch (error) {
        console.error("[messageController] Delete message error:", error);
        res.status(500).json({ message: "Error deleting message" });
    }
};

module.exports = { getMessages, addMessage, sendReply, deleteMessage };
