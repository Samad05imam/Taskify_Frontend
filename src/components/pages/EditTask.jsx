import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Button } from '../ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { TASK_API_END_POINT } from '@/utils/constant';
import { updateTask } from '../redux/taskSlice'; 

const EditTask = () => {
  const { user } = useSelector((store) => store.auth);
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await axios.get(`${TASK_API_END_POINT}/getsingle/${id}`, {
          withCredentials: true,
        });
        setTask(data.task);
      } catch (err) {
        console.error("Error fetching task:", err.response?.data?.msg || err.message);
      }
    };

    fetchTask();
  }, [id]);


  const handleChange = (e) => {
    setTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateTaskHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`${TASK_API_END_POINT}/update/${id}`, task, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (res?.data?.success) {
        dispatch(updateTask(res.data.task));
        toast.success(res.data.msg || "Task updated successfully");
        navigate('/getall');
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.msg || "Update failed");
    }
  };

  if (!user) {
    return (
      <div className='flex flex-col h-screen'>
        <Navbar />
        <div className="text-red-500 bg-slate-700 flex-1 text-center ">*Please login first to update tasks.</div>
        <Footer />
      </div>
    );
  }


  if (!task) {
    return (
      <div className='flex flex-col h-screen'>
        <Navbar />
        <div className="text-gray-400 text-center mt-10">Loading task...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Navbar />
      <main className="flex-1 bg-slate-800 text-slate-100 px-4 py-10">
        <div className="bg-slate-700 w-full max-w-2xl mx-auto p-6 rounded-xl shadow-md">
          <h1 className="text-2xl sm:text-3xl text-center font-bold text-blue-400 mb-6">
            Edit Task
          </h1>
          <form onSubmit={updateTaskHandler} className="space-y-5">
            <div className="flex flex-col">
              <label className="text-lg font-semibold">Title</label>
              <input
                type="text"
                name="title"
                value={task.title || ''}
                onChange={handleChange}
                placeholder="Enter task's title"
                className="bg-transparent border border-white text-white rounded-md px-3 py-2 mt-1"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold">Description</label>
              <input
                type="text"
                name="description"
                value={task.description || ''}
                onChange={handleChange}
                placeholder="Enter task's description"
                className="bg-transparent border border-white text-white rounded-md px-3 py-2 mt-1"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold">Status</label>
              <select
                name="status"
                value={task.status || ''}
                onChange={handleChange}
                className="bg-transparent border border-white text-white rounded-md px-3 py-2 mt-1"
              >
                <option className="bg-slate-500" value="">Select Status</option>
                <option className="bg-slate-500" value="pending">Pending</option>
                <option className="bg-slate-500" value="in-progress">In Progress</option>
                <option className="bg-slate-500" value="completed">Completed</option>
              </select>
            </div>

            <Button
              type="submit"
              className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
            >
              Update Task
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditTask;
