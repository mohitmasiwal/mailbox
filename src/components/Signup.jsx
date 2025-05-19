 import React, { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('✅ Signup successful! Redirecting to login...', {
        position: 'top-right',
        autoClose: 2000,
      });
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('❌ Email already in use. Please log in.', {
          position: 'top-right',
        });
      } else {
        toast.error(`❌ ${error.message}`, {
          position: 'top-right',
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </button>

        
        <p className="mt-4 text-sm text-center text-gray-600">
          Already a user?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Signup;
