/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalInfo: {
      type: null,
      item: null,
    },
  },
  reducers: {
    hideModal(state) {
      state.modalInfo.type = null;
      state.modalInfo.item = null;
    },
    showModal(state, actions) {
      state.modalInfo.type = actions.payload.type;
      state.modalInfo.item = actions.payload.item || null;
    },
  },
});

export const { hideModal, showModal } = modalSlice.actions;
export default modalSlice.reducer;
