import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Ad } from '../../typings/Ad'

type State = Ad[] | null

const initialState: State = null as State

export const adsSlice = createSlice({
  initialState,
  name: 'ads',
  reducers: {
    setAds: (state, action: PayloadAction<Ad[]>) => {
      return action.payload
    },
  },
})

export const { setAds } = adsSlice.actions

const adsReducer = adsSlice.reducer

export default adsReducer
