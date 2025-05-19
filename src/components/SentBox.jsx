 import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSentEmails,
  setSentLoading,
  setSentError,
  selectSentEmail,
} from '../Redux/sentBoxSlice';
import useFetchEmails from '../hooks/Fetching';

const SentBox = () => {
  const dispatch = useDispatch();
  const { emails, loading, selectedEmail, error } = useSelector((state) => state.sentBox);
  const userEmail = localStorage.getItem('email');

  useFetchEmails("sent", userEmail, {
    Emails: setSentEmails,
    Error: setSentError,
    Loading: setSentLoading,
  });

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg dark:text-gray-300">
      <h2 className="text-2xl font-bold mb-6 text-white text-center font-serif">Sent Emails</h2>

      {loading ? (
        <p className="text-blue-400 font-semibold animate-pulse text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 font-semibold text-center">{error}</p>
      ) : !selectedEmail ? (
        <ul className="space-y-4">
          {emails.map((email, index) => (
            <li
              key={index}
              onClick={() => dispatch(selectSentEmail(email))}
              className="border border-gray-700 p-4 rounded-md bg-gray-900 shadow cursor-pointer hover:bg-gray-700 transition-colors duration-200"
            >
              <h3 className="text-lg font-semibold text-white truncate">{email.subject}</h3>
              <p className="text-sm text-gray-400 truncate">To: {email.to}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="border border-gray-700 p-5 rounded-md shadow bg-gray-900">
          <button
            className="text-blue-400 text-sm mb-4 hover:underline focus:outline-none"
            onClick={() => dispatch(selectSentEmail(null))}
          >
            ← Back to Sent
          </button>
          <h3 className="text-xl font-bold text-white truncate">{selectedEmail.subject}</h3>
          <p className="text-gray-400 mt-2 truncate">To: {selectedEmail.to}</p>
          <p className="mt-4 text-gray-300 whitespace-pre-line leading-relaxed">{selectedEmail.body}</p>
        </div>
      )}
    </div>
  );
};

export default SentBox;
