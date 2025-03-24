import prisma from "../config/prismaClient"

export const getUsername = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id, // Assuming req.user.id is populated by middleware
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(201).json({ data: user.username });
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
