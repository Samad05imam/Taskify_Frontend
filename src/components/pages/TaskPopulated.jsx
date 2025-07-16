import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { TASK_API_END_POINT } from '@/utils/constant';
import { setTasks, deleteTask } from '../redux/taskSlice';
import { Backpack, Eye, LucideSkipBack, Pen, SkipBack, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TaskPopulated = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);

  // fetch tasks from backend
  const fetchAllTasks = async () => {
    try {
      const { data } = await axios.get(`${TASK_API_END_POINT}/getall`, {
        withCredentials: true,
      });
      dispatch(setTasks(data.tasks));
    } catch (error) {
      console.error('Error fetching tasks:', error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) fetchAllTasks();
  }, [dispatch, user]);

  // 🗑 Delete task handler
  const handleDelete = async (task) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      const res = await axios.delete(`${TASK_API_END_POINT}/delete/${task._id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(deleteTask(task._id));
        toast.success("Task deleted successfully");
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting task");
    }
  };

  // user not logged in
  if (!user) {
    return (
      <div className="flex-1 bg-slate-800 text-white p-4">
        <p className="text-red-500 font-bold text-md">*Please login or register first to access the tasks!</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-800 text-white p-4 overflow-y-auto">
      <div className='flex items-center justify-between'>
      <h2 className="text-2xl font-bold text-blue-400 mb-4">All Tasks</h2>
      <button className='flex items-center gap-3 text-xl border border-slate-700 text-blue-400 font-semibold px-2 py-1 rounded-full hover:text-white hover:bg-slate-600' onClick={()=>navigate("/")}><LucideSkipBack/> Back</button>
      </div>
      {Array.isArray(tasks) ? (
        tasks.length === 0 ? (
          <p className="text-gray-400">No tasks found.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="border border-slate-600 p-4 rounded-md hover:bg-slate-700 transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">{task.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-blue-400">
                      {task.createdAt === task.updatedAt ? (
                        <>
                          <span>Created: {task.createdAt.slice(0, 10)}</span>
                          <span>{task.createdAt.slice(11, 16)}</span>
                        </>
                      ) : (
                        <>
                          <span>Updated: {task.updatedAt.slice(0, 10)}</span>
                          <span>{task.updatedAt.slice(11, 16)}</span>
                        </>
                      )}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          task.status === 'completed'
                            ? 'bg-green-500 text-white'
                            : task.status === 'in-progress'
                              ? 'bg-yellow-500 text-black'
                              : 'bg-red-500 text-white'
                        }`}
                      >
                        {task.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-end">
                    <Eye onClick={()=>navigate(`/getsingle/${task._id}`)} className="w-5 h-5 cursor-pointer hover:text-blue-400" />
                    <Pen  onClick={()=>navigate(`/update/${task._id}`)} className="w-5 h-5 cursor-pointer hover:text-yellow-400" />
                    <Trash2
                      onClick={() => handleDelete(task)}
                      className="w-5 h-5 cursor-pointer hover:text-red-500"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )
      ) : (
        <p className="text-gray-400">Loading tasks...</p>
      )}
    </div>
  );
};

export default TaskPopulated;
