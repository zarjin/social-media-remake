import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/connectDB.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';

const app = express();

connectDB();

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is Running http://localhost:${PORT}`);
});
