import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {postLike } from './likeService';

const initialState={
  like :[],
  likesIt :0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
} 

export const createLike = createAsyncThunk("like/create/", async ({post_idpost, user_iduser}, thunkAPI) => {
  try {
      const response = await postLike({post_idpost, user_iduser});
      return response.data; 
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
  }
}); 

export const likeSlice = createSlice({
    name: 'like',
    initialState,
    reducers: {
        reducers: {
            reset: (state) => initialState,
          },
    },
    extraReducers: (builder) => {
      builder
   .addCase(createLike.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createLike.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
       state.like.push(action.payload)
      })
      .addCase(createLike.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })   
    },
  })

  export const { reset } = likeSlice.actions
  export default likeSlice.reducer