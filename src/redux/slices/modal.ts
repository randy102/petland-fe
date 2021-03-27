import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ModalName = 'LOGIN' | 'REGISTER';

type State = {
  open: ModalName | undefined;
};

const initialState: State = {
  open: undefined,
}

export const modalSlice = createSlice({
  initialState,
  name: 'modal',
  reducers: {
    closeModal: state => {
      state.open = undefined
    },
    openModal: (state, action: PayloadAction<ModalName>) => {
      state.open = action.payload
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

const modalReducer = modalSlice.reducer

export default modalReducer
