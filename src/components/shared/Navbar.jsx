import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckSquare, LogOut, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarImage } from '../ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
  import axiosInstance from "@/utils/axiosInstance";
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '../redux/authSlice';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()

const logoutHandler = async () => {
  try {
    const res = await axiosInstance.post("/user/logout");
    if (res.data.success) {
      dispatch(setUser(null));
      navigate('/');
      toast.success(res.data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Logout failed");
  }
};

  return (
    <header className="bg-slate-900 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-blue-400 text-2xl sm:text-3xl font-bold">
          <CheckSquare className="w-6 h-6 sm:w-7 sm:h-7" />
          <span className="font-serif">Taskify</span>
        </Link>

        {/* Desktop Menu */}
        <div className='flex gap-5 items-center'>
          <ul className="hidden sm:flex gap-4 text-md font-medium">
            <li>
              <Link to="/getall" className="hover:text-blue-400 transition">Tasks</Link>
            </li>
          </ul>

          {/* Auth buttons / Avatar */}
          <div className="hidden sm:flex items-center gap-3">
            {!user ? (
              <>
                <Link to="/login">
                  <Button className="border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white h-8 px-4 rounded-md text-sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white h-8 px-4 rounded-md text-sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <Popover>
                <PopoverTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/leerob.png" alt="user" />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-72 mt-2">
                  <div className="flex flex-col ">
                    <div className='flex items-center gap-4 mb-3'>
                      <Avatar>
                        <AvatarImage src="https://github.com/leerob.png" alt="User" />
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-lg">{user?.name}</h4>
                        <p className="text-gray-500 text-sm">Logged in</p>
                      </div>
                    </div>
                    <div className="flex w-fit items-center gap-2 cursor-pointer ">
                      <LogOut />
                      <Button className='hover:text-red-500' onClick={logoutHandler} variant='link'>Logout</Button>
                    </div>
                  </div>

                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
        {/* Mobile Menu Icon */}
        <button
          className="sm:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-slate-800 sm:hidden flex flex-col items-start gap-4 px-6 py-4 text-md shadow-lg">
            <Link to="/getall" className="text-white hover:text-blue-400 w-full" onClick={() => setMenuOpen(false)}>
              Tasks
            </Link>

            {!user ? (
              <div className="flex flex-col w-full gap-2 mt-3">
                <Link to="/login">
                  <Button className="w-full border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-3">
                <Avatar>
                  <AvatarImage src="https://github.com/leerob.png" alt="user" />
                </Avatar>
                <span className="text-sm font-semibold">{user.name}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
