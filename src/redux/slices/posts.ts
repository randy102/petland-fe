import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from 'src/typings/Post'

type State = Post[]

const initialState: State = []

export const postsSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      return action.payload
    },
  },
})

export const { setPosts } = postsSlice.actions

const postsReducer = postsSlice.reducer

export default postsReducer
