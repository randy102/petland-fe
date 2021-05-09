import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = 0

export const loadingCountSlice = createSlice({
  initialState,
  name: 'loadingCount',
  reducers: {
    increaseLoadingCount: (
      state,
      action: PayloadAction<number | undefined>
    ) => {
      return state + (action.payload || 1)
    },
    decreaseLoadingCount: (
      state,
      action: PayloadAction<number | undefined>
    ) => {
      return state - (action.payload || 1)
    },
  },
})

export const {
  increaseLoadingCount,
  decreaseLoadingCount,
} = loadingCountSlice.actions

const loadingCountReducer = loadingCountSlice.reducer

export default loadingCountReducer
