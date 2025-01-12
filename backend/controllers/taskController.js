import taskModel from '../models/taskModel.js';

// Get tasks for a user
export const getTasks = async (req, res) => {
    const { userId } = req.params;

    try {
        const tasks = await taskModel.find({ userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new task for a user
export const createTask = async (req, res) => {
    const { userId } = req.params;
    const { title } = req.body;

    try {
        const newTask = await taskModel.create({ userId, title });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a task for a user
export const updateTask = async (req, res) => {
    const { userId, taskId } = req.params;
    const { title, completed } = req.body;

    try {
        const task = await taskModel.findOneAndUpdate(
            { _id: taskId, userId },
            { title, completed },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a task for a user
export const deleteTask = async (req, res) => {
    const { userId, taskId } = req.params;

    try {
        const task = await taskModel.findOneAndDelete({ _id: taskId, userId });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};