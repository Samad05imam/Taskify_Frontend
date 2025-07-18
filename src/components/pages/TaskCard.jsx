import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { TASK_API_END_POINT } from '@/utils/constant';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Eye, LucideSkipBack, Pen } from 'lucide-react';

const TaskCard = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await axios.get(`${TASK_API_END_POINT}/getsingle/${id}`, {
          withCredentials: true,
        });

        if (data.success) {
          setTask(data.task);
        }
      } catch (error) {
        console.error("Error fetching task:", error.response?.data?.msg || error.message);
      }
    };

    if (id) fetchTask();
  }, [id]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-800 text-white">
      <Navbar />

      <main className="flex-1 p-4">
        <div className="max-w-screen-lg mx-auto space-y-6">
          {task ? (
            <>
              {/* Task Header */}
              <div className="border border-slate-600 p-4 rounded-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h1 className="text-2xl sm:text-3xl font-bold">{task.title.toUpperCase()}</h1>
                    <span
                      className={`text-sm px-3 py-1 rounded-full font-semibold ${
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
                  <p className="text-sm text-slate-400">
                    Created At: {task.createdAt.slice(0, 10)}
                  </p>
                </div>

                <div className="flex items-center gap-4 self-end md:self-auto">
                  <Pen
                    onClick={() => navigate(`/update/${task._id}`)}
                    className="w-5 h-5 cursor-pointer hover:text-yellow-400"
                    title="Edit"
                  />
                  <button
                    className="flex items-center gap-2 text-sm sm:text-md border border-slate-500 text-blue-400 px-3 py-1 rounded hover:text-white hover:bg-slate-700"
                    onClick={() => navigate("/getall")}
                  >
                    <LucideSkipBack size={16} />
                    Back
                  </button>
                </div>
              </div>

              {/* Description Section */}
              <div className="border border-slate-600 p-4 rounded-md">
                <h2 className="font-semibold text-lg mb-2">Description</h2>
                <p className="text-slate-300">{task.description}</p>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-400 text-center">Unable to load the task...</p>
              <div className="text-center mt-6">
                <button
                  className="flex mx-auto items-center gap-2 text-sm sm:text-md border border-slate-500 text-blue-400 px-3 py-1 rounded hover:text-white hover:bg-slate-700"
                  onClick={() => navigate("/getall")}
                >
                  <LucideSkipBack size={16} />
                  Back
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TaskCard;
