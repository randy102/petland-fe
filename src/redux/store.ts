import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './slices/modal'
import userReducer from './slices/user'
import adsReducer from './slices/ads'
import loadingCountReducer from './slices/loadingCount'

const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
    ads: adsReducer,
    loadingCount: loadingCountReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
