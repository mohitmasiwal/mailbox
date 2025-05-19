 
import { createSlice } from '@reduxjs/toolkit';

const inboxSlice = createSlice({
  name: 'inbox',
  initialState: {
    emails: [],
    selectedEmail: null,
    loading: false,
    error: null,
  },
  reducers: {
    setInboxEmails: (state, action) => {
      state.emails = action.payload;
      state.loading = false;
    },
    setInboxLoading: (state, action) => {
      state.loading = action.payload;
    },
    setInboxError: (state, action) => {
      state.error = action.payload;
    },
    selectEmail: (state, action) => {
      state.selectedEmail = action.payload;
    },
    
  },
});

export const {
  setInboxEmails,
  setInboxLoading,
  setInboxError,
  selectEmail,
} = inboxSlice.actions;

export default inboxSlice.reducer;




