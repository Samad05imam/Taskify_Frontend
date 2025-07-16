
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import { toast } from 'react-toastify';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant.js';
import { useSelector } from 'react-redux';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/signup`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  const { user } = useSelector(store => store.auth)
  useEffect(() => {
    if (user) {
      navigate("/")
      toast.success("You are already loggedin ! Need to do logout first !")
    }
  }, [])


  return (
    <div className='min-h-screen flex flex-col '>
      <Navbar />
      <div className=" bg-slate-700 flex flex-1 items-center justify-center text-white">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 p-8 rounded-md shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Sign Up</h2>

          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            className="w-full p-2 mb-4 rounded bg-transparent border border-slate-500 text-white"
            value={formData.name}
            onChange={handleChange}
          />

          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="w-full p-2 mb-4 rounded bg-transparent border border-slate-500 text-white"
            value={formData.email}
            onChange={handleChange}
          />

          <label className="block mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="w-full p-2 mb-6 rounded bg-transparent border border-slate-500 text-white"
            value={formData.password}
            onChange={handleChange}
          />

          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Sign Up
          </Button>

          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
