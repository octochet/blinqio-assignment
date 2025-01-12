import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Tasks = () => {
  const { userId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/tasks/${userId}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [userId]);

  const createTask = async () => {
    if (!newTask.trim()) return;
    try {
        const response = await axios.post(`http://localhost:4000/api/tasks/${userId}`, { 
            title: newTask 
        });
        setTasks([...tasks, response.data]);
        setNewTask("");
    } catch (error) {
        console.error("Error creating task:", error);
    }
  };

  const editTask = async (taskId) => {
    try {
        const response = await axios.put(`http://localhost:4000/api/tasks/${userId}/${taskId}`, {
            title: editValue
        });
        setTasks(tasks.map((task) => (task._id === taskId ? response.data : task)));
        setEditingTask(null);
    } catch (error) {
        console.error("Error editing task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
        await axios.delete(`http://localhost:4000/api/tasks/${userId}/${taskId}`);
        setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
        console.error("Error deleting task:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Your Tasks</h1>
      
      {/* Create Task */}
      <div className="mb-6 flex items-center">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="border rounded-l px-4 py-2 w-full"
        />
        <button
          onClick={createTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task._id} className="bg-white p-4 rounded shadow flex items-center justify-between">
            {editingTask === task._id ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="border rounded px-2 py-1 flex-1"
              />
            ) : (
              <span>{task.title}</span>
            )}

            <div className="flex items-center gap-2">
              {editingTask === task._id ? (
                <button
                  onClick={() => editTask(task._id)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingTask(task._id);
                    setEditValue(task.title);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
