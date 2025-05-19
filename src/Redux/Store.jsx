 import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import inboxReducer from './inboxSlice';  
import sentBoxReducer from './sentBoxSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    inbox: inboxReducer,  
     sentBox: sentBoxReducer,
  },
});

 
