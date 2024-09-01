import { createSlice } from "@reduxjs/toolkit";

type UIState = {
  modalIsVisible: boolean;
  editModalIsVisible: boolean;
};

const initialState: UIState = {
  modalIsVisible: false,
  editModalIsVisible: false,
};

export const UISlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.modalIsVisible = !state.modalIsVisible;
    },
    toggleEditModal: (state) => {
      state.editModalIsVisible = !state.editModalIsVisible;
    },
  },
});

export const { toggleModal, toggleEditModal } = UISlice.actions;
export default UISlice.reducer;
