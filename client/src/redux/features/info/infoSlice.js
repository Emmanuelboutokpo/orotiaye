import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllInfo,getInfo, postInfo } from './infoService';

 
const initialState={
  info :[],
  singleInfo : [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getAllInfos = createAsyncThunk("info/getAllInfos", async (_, { rejectWithValue }) => {
  try {
      const response = await getAllInfo();
      return response.data;
     
  } catch (error) {
      return rejectWithValue(error.response.data)
  }
});

export const getInfos = createAsyncThunk("info/getInfo", async (infoId, thunkAPI) => {
  try {
      const response = await getInfo(infoId);
      return response.data; 
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
  }
}); 

export const createInfo = createAsyncThunk("info/create", async ({formValue}, thunkAPI) => {
  try {
        console.log(formValue);
       const response = await postInfo(formValue);
      return response.data; 
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
  }
}); 


export const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        reducers: {
            reset: (state) => initialState,
          },
    },
    extraReducers: (builder) => {
      builder
      .addCase(getAllInfos.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllInfos.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
       state.info = action.payload
      })
      .addCase(getAllInfos.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getInfos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInfos.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
       state.singleInfo = action.payload
      })
      .addCase(getInfos.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createInfo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createInfo.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
       state.info.push(action.payload)
      })
      .addCase(createInfo.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

    },
  })

  export const { reset } = infoSlice.actions
  export default infoSlice.reducer