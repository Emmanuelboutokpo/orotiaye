import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosIntance, deleteComment, getAllComment, getComment, postComment } from './commentService';

const initialState={
  comment :[],
  singleComment:[],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const getAllComments = createAsyncThunk("comment/getAllComments", async (_, { rejectWithValue }) => {
  try {
      const response = await getAllComment();
      console.log(response);
      return response.data;
     
  } catch (error) {
      return rejectWithValue(error.response.data)
  }
});

export const getComments = createAsyncThunk("comment/getComment/", async (commentId, thunkAPI) => {
  try {
      const response = await getComment(commentId);
      return response.data; 
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
  }
}); 

export const createComment = createAsyncThunk("comment/createComment", async (form, thunkAPI) => {
  try {
    const response = await postComment(form);
   return response.data; 
} catch (error) {
   return thunkAPI.rejectWithValue(error.response.data)
}
}); 

export const deleteComments = createAsyncThunk("comment/deleteComment/", async (commentId, thunkAPI) => {
  try {
       const response = await deleteComment(commentId)
      return response.data; 
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
  }
}); 
export const updateComment = createAsyncThunk("comment/updateComment", async (forms, thunkAPI) => {
  try {
        const {idcomment, content} = forms
      const response = await axiosIntance.put(`/comment/putComment/${idcomment}`, {content});
      return response.data;
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
  }
}); 

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        reducers: {
            reset: (state) => initialState,
          },
    },
    extraReducers: (builder) => {
      builder
      .addCase(getAllComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
       state.comment = action.payload
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
       state.comment = action.payload
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
   .addCase(createComment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
       state.comment.push(action.payload)
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })  
   .addCase(deleteComments.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteComments.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.comment = state.comment.filter(
          (item) => item.idcomment !== action.payload.idcomment
        )
      })
      .addCase(deleteComments.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })       
   .addCase(updateComment.pending, (state) => {
    state.isLoading = true
  })
  .addCase(updateComment.fulfilled, (state, action) => {
    state.isLoading = false
    state.isSuccess = true
    state.comment = state.comment.map((item) =>
    item.idcomment === action.payload.idcomment? action.payload : item
    )
  })
  .addCase(updateComment.rejected, (state, action) => {
    state.isLoading = false
    state.isError = true
    state.message = action.payload
  })  
    },
  })

  export const { reset } = commentSlice.actions
  export default commentSlice.reducer