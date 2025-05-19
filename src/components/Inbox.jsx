 import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update, ref } from 'firebase/database';
import { db } from '../components/firebase';  
import useFetchEmails from '../hooks/Fetching';
import {
  setInboxEmails,
  setInboxLoading,
  setInboxError,
  selectEmail,
} from '../Redux/inboxSlice';

 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Inbox = () => {
  const dispatch = useDispatch();
  const { emails, selectedEmail, loading, error } = useSelector((state) => state.inbox);
  const emailsunreaded = useSelector((state) => state.inbox.emails);
  const unreadCount = emailsunreaded.filter(email => !email.read).length;
  const userEmail = localStorage.getItem('email')?.replace('.', '_');  

  useFetchEmails('inbox', userEmail, {
    Emails: setInboxEmails,
    Error: setInboxError,
    Loading: setInboxLoading
  });

  
  const prevEmailsRef = useRef([]);

  
  useEffect(() => {
    if (!emails) return;

    if (prevEmailsRef.current.length && emails.length > prevEmailsRef.current.length) {
      toast.success('📩 New email received!', {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
      });
    }
    prevEmailsRef.current = emails;
  }, [emails]);

  const handleEmail = (email) => {
    dispatch(selectEmail(email));

    update(ref(db, `mails/${userEmail}/inbox/${email.id}`), {
      read: true
    });
  };

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="max-w-2xl mt-11 mx-auto p-4 bg-gray-800 text-white">
      <div className='flex justify-between'>
        <h2 className="text-xl font-semibold mb-4">Inbox</h2>
        <button className="text-sm font-semibold mb-2 bg-yellow-100 text-yellow-900 px-3 py-1 rounded-full shadow hover:bg-yellow-200 transition">
          Unread <sup className="text-xs font-bold ">{unreadCount}</sup>
        </button>
      </div>

      {!selectedEmail ? (
        <ul className="space-y-3">
          {emails.map((email) => (
            <li
              key={email.id}
              onClick={() => handleEmail(email)}
              className={`relative border p-4 rounded shadow cursor-pointer hover:bg-gray-700 transition-all duration-200 ${
                email.read ? 'bg-gray-900' : 'bg-blue-900 border-blue-400'
              }`}
            >
              {!email.read && (
                <>
                  <span className="absolute top-2 right-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                    Unread
                  </span>
                  <span className="mr-2">📩</span>
                </>
              )}
              <p className={`font-semibold ${email.read ? 'text-gray-400' : 'text-blue-400'}`}>
                {email.from}
              </p>
              <p className="text-sm text-gray-500 truncate">{email.subject}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="border p-4 rounded shadow bg-gray-700">
          <button
            className="text-sm text-blue-600 mb-3"
            onClick={() => dispatch(selectEmail(null))}
          >
            ← Back to Inbox
          </button>
          <h3 className="text-lg font-bold">{selectedEmail.subject}</h3>
          <p className="text-sm text-gray-400">From: {selectedEmail.from}</p>
          <p className="mt-2">{selectedEmail.body}</p>
        </div>
      )}

     
      <ToastContainer />
    </div>
  );
};

export default Inbox;
