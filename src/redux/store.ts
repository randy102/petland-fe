import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './slices/modal'
import userReducer from './slices/user'

const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
