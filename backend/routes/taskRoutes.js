import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const taskRouter = express.Router();

taskRouter.route('/:userId')
.get(protect, getTasks)
.post(protect, createTask);

taskRouter.route('/:userId/:taskId')
.put(protect, updateTask)
.delete(protect, deleteTask);

export default taskRouter;