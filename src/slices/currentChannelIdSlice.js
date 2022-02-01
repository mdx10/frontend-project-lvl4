/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: {
    currentChannelId: 1,
  },
  reducers: {
    setCurrentChannelId(state, actions) {
      state.currentChannelId = actions.payload;
    },
  },
});

export const { setCurrentChannelId } = currentChannelIdSlice.actions;
export default currentChannelIdSlice.reducer;
