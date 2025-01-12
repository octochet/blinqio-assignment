import express from 'express';
import { registerUser, authUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', authUser);

export default userRouter;