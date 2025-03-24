import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './routes/authRouters';
import { protect } from './middlewares/authMiddleware';
import router from './routes/router';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',  
    allowedHeaders: 'Content-Type,Authorization',
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware
app.use('/api', protect, router);
app.use('/', authRouter);

export default app;
