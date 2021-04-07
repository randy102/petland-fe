import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'src/types/User'

type State = User | undefined

const initialState: State = undefined as State


export const userSlice = createSlice({
  initialState,
  name: 'cities',
  reducers: {
    logout: () => {
      localStorage.removeItem('token')
      return undefined
    },
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

const userReducer = userSlice.reducer

export default userReducer
