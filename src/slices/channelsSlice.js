/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: null,
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
    renameChannel(state, actions) {
      const { id, name } = actions.payload;
      const channel = state.channels.find((c) => c.id === id);
      channel.name = name;
    },
    setCurrentChannelId(state, actions) {
      state.currentChannelId = actions.payload;
    },
  },
});

export const {
  setChannels,
  addChannel,
  removeChannel,
  renameChannel,
  setCurrentChannelId,
} = channelsSlice.actions;
export default channelsSlice.reducer;
