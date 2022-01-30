/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages(state, actions) {
      state.messages = actions.payload;
    },
  },
});

export const { setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
