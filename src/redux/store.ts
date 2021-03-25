import { configureStore } from '@reduxjs/toolkit';
import registerLoginModalReducer from './slices/registerLoginModal';

const store = configureStore({
  reducer: {
    registerLoginModal: registerLoginModalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
