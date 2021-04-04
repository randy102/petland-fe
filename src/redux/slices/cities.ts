import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { City } from 'src/types/City'

type State = City[]

const initialState: State = []


export const citiesSlice = createSlice({
  initialState,
  name: 'cities',
  reducers: {
    setCities: (state, action: PayloadAction<City[]>) => {
      return action.payload
    }
  }
})

export const { setCities } = citiesSlice.actions

const citiesReducer = citiesSlice.reducer

export default citiesReducer
