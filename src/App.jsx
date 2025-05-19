 import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Inbox from './components/Inbox';
import SentBox from './components/SentBox';
import Home from './Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Header from './components/Header';
import { useDispatch } from 'react-redux';
import { login } from './Redux/authSlice';
const App = () => {
 const dispatch = useDispatch()
 
 
useEffect(()=>{
const token = localStorage.getItem("token")
if(token){
dispatch(login())
}

},[])



  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/sentbox" element={<SentBox/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
