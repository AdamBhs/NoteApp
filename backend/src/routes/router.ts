import { Router } from 'express';
import { addNote, deleteNote, editNote, getNotes } from '../controllers/notes';
import { getUsername } from '../controllers/user';

const router = Router();

router.get('/notes', getNotes);
router.post('/addnote', addNote);
router.delete('/deletenote', deleteNote);
router.put('/editnote/:id', editNote)
router.get('/user', getUsername);

export default router;
