import express, { request, response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const PORT = process.env.PORT || 4000;

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes for user and tasks
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRoutes);


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});