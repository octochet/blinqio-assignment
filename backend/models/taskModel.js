import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId : { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    Completed: { type: Boolean, required: true, default: false }
});

const taskModel = mongoose.model("Task", taskSchema);

export default taskModel;