import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RegisterLoginModalTab = 'LOGIN' | 'REGISTER';

type State = {
  open: boolean;
  tab: RegisterLoginModalTab;
};

const initialState: State = {
  open: false,
  tab: 'LOGIN',
};

export const registerLoginModalSlice = createSlice({
  name: 'registerLoginModal',
  initialState,
  reducers: {
    changeTab: (state, action: PayloadAction<RegisterLoginModalTab>) => {
      state.tab = action.payload;
    },
    open: (state, action: PayloadAction<RegisterLoginModalTab>) => {
      state.open = true;
      state.tab = action.payload;
    },
    close: state => {
      state.open = false;
    },
  },
});

export const { changeTab, open, close } = registerLoginModalSlice.actions;

const registerLoginModalReducer = registerLoginModalSlice.reducer;

export default registerLoginModalReducer;
