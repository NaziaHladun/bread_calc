import { createSlice } from "@reduxjs/toolkit";

type UIState = {
  modalIsVisible: boolean;
};

const initialState: UIState = {
  modalIsVisible: false,
};

export const UISlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    toggle: (state) => {
      state.modalIsVisible = !state.modalIsVisible;
      console.log("Azaza toggle");
    },
  },
});

export const { toggle } = UISlice.actions;

export default UISlice.reducer;
