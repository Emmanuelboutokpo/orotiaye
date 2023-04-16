import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {axiosIntance, deletePost, getAllPost, getPost} from './postService';

const initialState={
  post :[],
  singlePost:[],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const getAllPosts = createAsyncThunk("post/getAllPosts", async (_, { rejectWithValue }) => {
  try {
      const response = await getAllPost();
      return response.data;
     
  } catch (error) {
      return rejectWithValue(error.response.data)
  }
});

export const getPosts = createAsyncThunk("post/getPost/", async (postId, thunkAPI) => {
  try {
      const response = await getPost(postId);
      return response.data; 
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
  }
}); 

export const createPost = createAsyncThunk("post/createPost", async (formData, { rejectWithValue }) => {
  try {
      const response = await axiosIntance.post(`/post/create`, formData);  
      return response.data;
  } catch (error) {
      return rejectWithValue(error.response.data)
  }
}); 

export const deletePosts = createAsyncThunk("post/deletePost/", async (postId, thunkAPI) => {
  try {
       const response = await deletePost(postId)
      return response.data; 
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
  }
}); 

export const updatePost = createAsyncThunk("post/updatePost", async ({idPost,titlePost,value,category_idCat,imgPost,readtime,user_iduser}, thunkAPI) => {
  try {
      const response = await axiosIntance.put(`/post/putPost/${idPost}`, {titlePost,value,imgPost,readtime,user_iduser,category_idCat});
      return response.data;
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
  }
}); 

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        reducers: {
            reset: (state) => initialState,
          },
    },
    extraReducers: (builder) => {
      builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
       state.post = action.payload
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
       state.singlePost = action.payload
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
   .addCase(createPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
       state.post.result.push(action.payload.result)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })  
   .addCase(deletePosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.post.result = state.post.result.filter(
          (item) => item.idPost !== action.payload.idPost
        )
      })
      .addCase(deletePosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })  
      
   .addCase(updatePost.pending, (state) => {
    state.isLoading = true
  })
  .addCase(updatePost.fulfilled, (state, action) => {
    state.isLoading = false
    state.isSuccess = true
    state.post.result = state.post.result.map((item) =>
    item.idpost === action.payload.idpost ? action.payload : item
    )
  })
  .addCase(updatePost.rejected, (state, action) => {
    state.isLoading = false
    state.isError = true
    state.message = action.payload
  })  
    },
  })

  export const { reset } = postSlice.actions
  export default postSlice.reducer