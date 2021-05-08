import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'src/typings/User'

type State = User | null

const initialState: State = null as State

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    logout: () => {
      localStorage.removeItem('token')
      return null
    },
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      if (!state) return

      state.avatar = action.payload
    },
  },
})

export const { setUser, logout, setAvatar } = userSlice.actions

const userReducer = userSlice.reducer

export default userReducer
