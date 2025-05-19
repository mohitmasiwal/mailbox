 import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Redux/authSlice';
import {
  setInboxEmails,
  setInboxLoading,
  setInboxError,
   
} from '../Redux/inboxSlice';
import useFetchEmails from '../hooks/Fetching';


import {
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.islogin);
  const emailsunreaded = useSelector((state) => state.inbox.emails);
  
   const unreadCount = emailsunreaded.filter(email => !email.read).length;
  const userEmail = localStorage.getItem('email')?.replace('.', '_');  

  const [menuOpen, setMenuOpen] = useState(false);
  

  useFetchEmails('inbox', userEmail, {
    Emails: setInboxEmails,
    Error: setInboxError,
    Loading: setInboxLoading
  });


  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <header className="bg-gray-800 shadow-md px-4 py-3 flex justify-between items-center relative dark">
      <h1 
        onClick={() => navigate('/')} 
        className="text-2xl font-bold text-white font-serif cursor-pointer"
      >
        Mailbox
      </h1>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => handleNavigate('/inbox')}
            className="text-white font-extrabold hover:underline"
          >
            Inbox <sup>{unreadCount}</sup>
          </button>
          <button
            onClick={() => handleNavigate('/sentbox')}
            className="text-white font-extrabold hover:underline"
          >
            SentBox
          </button>
        </div>

        {isLogin ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 font-extrabold text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => handleNavigate('/login')}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Login
          </button>
        )}

        <button onClick={toggleMenu} className="md:hidden text-white">
          {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute right-4 top-16 bg-gray-700 shadow-lg rounded w-40 py-2 z-10 md:hidden">
          <button
            onClick={() => handleNavigate('/inbox')}
            className="font-extrabold block w-full text-left px-4 py-2 hover:bg-gray-600 text-sm text-white"
          >
            Inbox <sup>{unreadCount}</sup>
          </button>
          <button
            onClick={() => handleNavigate('/sentbox')}
            className="font-extrabold block w-full text-left px-4 py-2 hover:bg-gray-600 text-sm text-white"
          >
            SentBox
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
