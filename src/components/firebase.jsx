 
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBTGd1a9jC6kqHdqPS4XvhYZnVWk0oMVug',
  authDomain: 'mailclient-c5d9a.firebaseapp.com',
  projectId: 'mailclient-c5d9a',
  storageBucket: 'mailclient-c5d9a.appspot.com',
  messagingSenderId: '97585488413',
   
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
 export const db = getDatabase(app);