/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
  },
  reducers: {
    setChannels(state, actions) {
      state.channels = actions.payload;
    },
    addChannel(state, actions) {
      state.channels.push(actions.payload);
    },
    removeChannel(state, actions) {
      state.channels = state.channels.filter(({ id }) => id !== actions.payload);
    },
  },
});

export const { setChannels, addChannel, removeChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
