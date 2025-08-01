import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modal: "close",
  },
  reducers: {
    openModal: (state) => {
      state.modal = "open";
    },
  },
});

export const { openModal } = modalSlice.actions;
export default modalSlice.reducer;
