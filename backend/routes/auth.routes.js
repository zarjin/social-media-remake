import express from 'express';
import { login, logout, register, checkAuth } from '../controllers/auth.controller.js';
import isAuthentication from '../middlewares/isAuthentication.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/logout', logout);
authRouter.get('/check-auth', isAuthentication, checkAuth);

export default authRouter;
