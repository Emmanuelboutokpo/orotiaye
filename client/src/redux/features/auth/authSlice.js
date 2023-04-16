import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {signIn, signUp,getUser} from "./authService";

const initialState = {
    token : null,
    user :{
        firstName : "",
        lastName : "" , 
        email : "" ,
        img : ""
    },
    isLoading : false,
    isSuccess : false,
    isError : false,
    message : ""
}

export const login = createAsyncThunk("auth/login", async ({ formValue, navigate}, { rejectWithValue }) => {
    try {
        const response = await signIn(formValue)
      
        navigate("/");
        return response.data;
  
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
  });

  export const register = createAsyncThunk("auth/register", async ({ formData, navigate}, { rejectWithValue }) => {
    try {
        const response = await signUp(formData)
        
        navigate("/login");
        return response.data;
  
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
  });

  export const getUsers = createAsyncThunk("user/getUser/", async (userId, thunkAPI) => {
    try {
        const response = await getUser(userId);
        return response.data; 
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
  }); 
  

export const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
          state.user =  action.payload
          state.token =  action.payload
          state.isSuccess = true;
          state.isLoading = false;
          state.isError = false
      },
        reset: (state) => {
          state.user =  null
          state.token =  null
          localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
          state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          localStorage.setItem('token', action.payload.token);
          localStorage.setItem('user', JSON.stringify(action.payload.other));
          state.user = action.payload.other;
          state.token = action.payload.token;
          state.isError = false;
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
       .addCase(register.pending, (state) => {
            state.isLoading = true
          })
          .addCase(register.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.message=action.payload
              state.isError = false;
          })
          .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          }) 
          .addCase(getUsers.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
          })
          .addCase(getUsers.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })  
      },
})

export const isUserLoggedIn = () => {
    return async (dispatch) => {
      const token = localStorage.getItem("token");
      if (token) {
        const user = JSON.parse(localStorage.getItem("user"))
        dispatch({
          type: "auth/setUser",
          payload: { 
            token, user
          }
        });
      }  
    }
  }

export const { reset } = authSlice.actions
export default authSlice.reducer