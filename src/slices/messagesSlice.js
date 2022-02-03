/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice.js';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages(state, actions) {
      state.messages = actions.payload;
    },
    addMessage(state, actions) {
      state.messages.push(actions.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, actions) => {
      const channelId = actions.payload;
      state.messages = state.messages.filter((m) => m.channelId !== channelId);
    });
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
