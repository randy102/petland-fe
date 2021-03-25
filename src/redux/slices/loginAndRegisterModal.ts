import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LoginAndRegisterModalTab = 'LOGIN' | 'REGISTER';

type State = {
  open: boolean;
  tab: LoginAndRegisterModalTab;
};

const initialState: State = {
  open: false,
  tab: 'LOGIN',
};

export const loginAndRegisterModalSlice = createSlice({
  name: 'registerLoginModal',
  initialState,
  reducers: {
    changeTab: (state, action: PayloadAction<LoginAndRegisterModalTab>) => {
      state.tab = action.payload;
    },
    open: (state, action: PayloadAction<LoginAndRegisterModalTab>) => {
      state.open = true;
      state.tab = action.payload;
    },
    close: state => {
      state.open = false;
    },
  },
});

export const { changeTab, open, close } = loginAndRegisterModalSlice.actions;

const loginAndRegisterModalReducer = loginAndRegisterModalSlice.reducer;

export default loginAndRegisterModalReducer;
