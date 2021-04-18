import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'src/types/User'

type State = User | null

const initialState: State = null as State


export const userSlice = createSlice({
  initialState,
  name: 'cities',
  reducers: {
    logout: () => {
      localStorage.removeItem('token')
      return null
    },
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload
    }
  }
})

export const { setUser, logout } = userSlice.actions

const userReducer = userSlice.reducer

export default userReducer
