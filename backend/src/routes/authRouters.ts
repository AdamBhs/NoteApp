import express from 'express';
import { createNewUser, signIn } from '../controllers/authController';

const router = express.Router();

router.post('/signup', createNewUser);
router.post('/login', signIn);

export default router;
