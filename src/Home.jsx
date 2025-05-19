 import React, { useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const toRef = useRef();
  const subjectRef = useRef();
  const messageRef = useRef();

  const handleSend = async (e) => {
    e.preventDefault();

    const to = toRef.current.value;
    const subject = subjectRef.current.value;
    const message = messageRef.current.value;
    const from = localStorage.getItem('email');

    if (!from) {
      toast.error('No sender email found. Please login.');
      return;
    }

    const mailData = {
      to,
      from,
      subject,
      body: message,
      timestamp: new Date().toISOString(),
      read: false,
    };

    const emailKey = Date.now();
    const safeSenderEmail = from.replace(/\./g, '_');
    const safeReceiverEmail = to.replace(/\./g, '_');

    const senderPath = `https://mailclient-c5d9a-default-rtdb.firebaseio.com/mails/${safeSenderEmail}/sent/${emailKey}.json`;
    const receiverPath = `https://mailclient-c5d9a-default-rtdb.firebaseio.com/mails/${safeReceiverEmail}/inbox/${emailKey}.json`;

    try {
      await axios.put(senderPath, mailData);
      await axios.put(receiverPath, mailData);
      toast.success('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-6">
      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-md p-10 rounded-2xl max-w-3xl w-full shadow-2xl border border-gray-700">
        <h2 className="text-4xl font-extrabold text-white mb-8 text-center tracking-wide font-sans">
          Compose Email
        </h2>
        <form onSubmit={handleSend} className="space-y-6">
          <input
            type="email"
            ref={toRef}
            placeholder="Recipient's Email"
            required
            className="w-full px-5 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
          <input
            type="text"
            ref={subjectRef}
            placeholder="Subject"
            required
            className="w-full px-5 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
          <textarea
            ref={messageRef}
            placeholder="Write your message..."
            rows="8"
            required
            className="w-full px-5 py-4 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 resize-y focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white font-bold rounded-xl hover:scale-105 hover:shadow-lg transition-transform duration-300"
          >
            Send Email
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Home;
