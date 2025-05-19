 
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const useFetchEmails = (emailType, email, sliceActions) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!email) return;

    const safeEmail = email.replace(/\./g, '_');
    dispatch(sliceActions.Loading());

    axios
      .get(`https://mailclient-c5d9a-default-rtdb.firebaseio.com/mails/${safeEmail}/${emailType}.json`)
      .then((res) => {
        const data = res.data || {};

         
        const formattedEmails = Object.entries(data).map(([id, emailObj]) => ({
          id,
          ...emailObj,
        }));

        dispatch(sliceActions.Emails(formattedEmails));
      })
      .catch((err) => {
        console.error('Error fetching emails:', err);
        dispatch(sliceActions.Error(err.message));
      });
  }, [email, emailType, dispatch, sliceActions]);
};

export default useFetchEmails;
