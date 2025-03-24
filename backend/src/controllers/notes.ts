import prisma from "../config/prismaClient"

// Get all Notes
export const getNotes = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id,
        },
        include: {
            notes: true,
        }
    });

    res.status(201).json({data: user.notes});
}

export const addNote = async (req, res) => {
    try {
        const newNote = await prisma.note.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                isPinned: req.body.isPinned,
                tags: req.body.tags,
                userId: req.user.id
            }
        });
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.body; 

        if (!id) {
            return res.status(400).json({ message: "Note ID is required" });
        }

        const note = await prisma.note.findUnique({ where: { id } });

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        await prisma.note.delete({ where: { id } });

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const editNote = async (req, res) => {
    try {
        const { id } = req.params

        const newNote = await prisma.note.update({
            where: { id },
            data: {
                title: req.body.title,
                content: req.body.content,
                tags: req.body.tags,
                userId: req.user.id
            }
        });
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}