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
  },
});

export const { setChannels } = channelsSlice.actions;
export default channelsSlice.reducer;
