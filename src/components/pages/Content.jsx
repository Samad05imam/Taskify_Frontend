import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { TASK_API_END_POINT } from '@/utils/constant';
import { addTask } from '../redux/taskSlice';

const Content = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //  useState for inputs
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: '',
  });

  //  generic onChange handler
  const handleChange = (e) => {
    setTaskData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createTask = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${TASK_API_END_POINT}/create`, taskData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, 
      });

      if (res?.data?.success) {
        dispatch(addTask(res.data.task));
        toast.success(res.data.message);

        //  Clear form
        setTaskData({
          title: '',
          description: '',
          status: '',
        });

        //  Navigate after short delay (optional but safe)
        setTimeout(() => {
          navigate('/getall');
        }, 300);
      }

    } catch (error) {
      console.error("Task creation error:", error);
      toast.error(error.response?.data?.msg || "Task creation failed");
    }
  };

  
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />

      <main className="flex-1 bg-slate-800 text-slate-100 px-4 py-12">
        <div className="bg-slate-700 w-full max-w-2xl mx-auto p-6 rounded-xl shadow-md">
          <h1 className="text-2xl sm:text-3xl text-center font-bold text-blue-950 mb-6 text-shadow-2xs text-shadow-blue-400">
            Let's start adding tasks from now!
          </h1>

          <form onSubmit={createTask} className="space-y-5">
            <div className="flex flex-col">
              <label className="text-lg font-semibold">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter task's title"
                value={taskData.title}
                onChange={handleChange}
                className="bg-transparent border border-white text-white rounded-md px-3 py-2 mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold">Description</label>
              <input
                type="text"
                name="description"
                placeholder="Enter task's description"
                value={taskData.description}
                onChange={handleChange}
                className="bg-transparent border border-white text-white rounded-md px-3 py-2 mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold">Status</label>
              <select
                name="status"
                value={taskData.status}
                onChange={handleChange}
                className="bg-transparent border border-white text-white rounded-md px-3 py-2 mt-1"
              >
                <option className="bg-slate-500" value="">
                  Select Status
                </option>
                <option className="bg-slate-500" value="pending">
                  Pending
                </option>
                <option className="bg-slate-500" value="in-progress">
                  In Progress
                </option>
                <option className="bg-slate-500" value="completed">
                  Completed
                </option>
              </select>
            </div>
            {!user ? (
              <>
                <Button
                  type="submit"
                  disabled="isDisable"
                  className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
                >
                  Submit Task
                </Button>
                <p className="text-sm text-red-500 font-medium text-center mt-3">
                  *Please login or signup first before creating any task.
                </p>
              </>
            )
              : (<Button
                type="submit"
                className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
              >
                Submit Task
              </Button>)
            }
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Content;
