 import { createSlice } from '@reduxjs/toolkit';

const sentBoxSlice = createSlice({
  name: 'sentBox',
  initialState: {
    emails: [],
    loading: false,
    error: null,
    selectedEmail: null,
  },
  reducers: {
    setSentEmails: (state, action) => {
      state.emails = action.payload;
      state.loading = false;
    },
    setSentLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSentError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    selectSentEmail: (state, action) => {
      state.selectedEmail = action.payload;
    },
  },
});

export const {
  setSentEmails,
  setSentLoading,
  setSentError,
  selectSentEmail,
} = sentBoxSlice.actions;

export default sentBoxSlice.reducer;
