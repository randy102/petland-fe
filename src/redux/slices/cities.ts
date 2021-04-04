import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { City } from 'src/types/City'

type State = {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  cities: City[]
}

const initialState: State = {
  cities: [],
  loading: 'idle'
}

export const fetchCities = createAsyncThunk(
  'cities/fetchCities',
  async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/city`)
    return response.data
  }
)

export const citiesSlice = createSlice({
  extraReducers: {
    [fetchCities.pending.type]: (state) => {
      state.loading = 'pending'
    },
    [fetchCities.fulfilled.type]: (state, action: PayloadAction<City[]>) => {
      state.cities = action.payload
      state.loading = 'succeeded'
    },
    [fetchCities.rejected.type]: (state) => {
      state.loading = 'failed'
    }
  },
  initialState,
  name: 'cities',
  reducers: {
    
  }
})

const citiesReducer = citiesSlice.reducer

export default citiesReducer
