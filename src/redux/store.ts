import { configureStore } from '@reduxjs/toolkit';
import loginAndRegisterModalReducer from './slices/loginAndRegisterModal';

const store = configureStore({
  reducer: {
    loginAndRegisterModal: loginAndRegisterModalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
