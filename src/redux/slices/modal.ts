import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModalName = 'LOGIN' | 'REGISTER';

type State = {
  open: ModalName | undefined;
};

const initialState: State = {
  open: undefined,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalName>) => {
      state.open = action.payload;
    },
    closeModal: state => {
      state.open = undefined;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

const modalReducer = modalSlice.reducer;

export default modalReducer;
