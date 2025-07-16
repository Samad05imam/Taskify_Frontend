import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import axios from 'axios';
import { setUser } from '../redux/authSlice';
import { toast } from 'react-toastify';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, formData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate('/');
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  };
  const {user} = useSelector(store=>store.auth)
  useEffect(()=>{
    if(user){
      navigate("/")
      
      toast.success("You are already loggedin ! Need to do logout first !")
    }
  },[])

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar/>
    <div className="flex-1 bg-slate-700 flex items-center justify-center text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-md shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Login</h2>

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
          Login
        </Button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
    </div>
  );
};

export default Login;
