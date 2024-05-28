import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { calculateResult, fetchCount, login, sendNumber, signup, verifyOtp } from './calculatorApi';

const initialState = {
  value: 0,
  status: 'idle',
  result: null,
  isAuthenticated: false,
  userInfo: null,
  isOtpVerified: false,
  isNumberRecieved : false
};

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const calculateResultAsync = createAsyncThunk(
  'calculator/calculateResult',
  async (info ) => {
    try{
      const response = await calculateResult(info);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
    }catch(error){
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const signupAsync = createAsyncThunk(
  'calculator/signup',
  async (signupInfo ) => {
    try{
      const response = await signup(signupInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
    }catch(error){
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const loginAsync = createAsyncThunk(
  'calculator/login',
  async (loginInfo ) => {
    try{
      const response = await login(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
    }catch(error){
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const verifyOtpAsync = createAsyncThunk(
  'calculator/verifyOtp',
  async (verifyOtpInfo ) => {
    try{
      const response = await verifyOtp(verifyOtpInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
    }catch(error){
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const sendNumberAsync = createAsyncThunk(
  'calculator/sendNumber',
  async (sendNumberInfo ) => {
    try{
      const response = await sendNumber(sendNumberInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
    }catch(error){
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const calculatorSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })
      .addCase(calculateResultAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(calculateResultAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.result = action.payload;
      })
      .addCase(calculateResultAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(signupAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isAuthenticated = true;
        state.userInfo = action.payload.data;
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isAuthenticated = true;
        state.userInfo = action.payload.data;
        // console.log(action.payload);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(sendNumberAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendNumberAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isNumberRecieved = action.payload.data;
        // console.log(action.payload);
      })
      .addCase(sendNumberAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(verifyOtpAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyOtpAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isOtpVerified = action.payload.success;
        // console.log(action.payload);
      })
      .addCase(verifyOtpAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      ;
  },
});

// export const { increment } = counterSlice.actions;

export const selectCount = (state) => state.counter.value;
export const selectCalculator = (state)=>state.calculator.result;
export const selectIsAuthenticated = (state)=>state.calculator.isAuthenticated;
export const selectIsNumberRecieved = (state)=>state.calculator.isNumberRecieved;
export const selectIsOtpVerified = (state)=>state.calculator.isOtpVerified;
export const selectUserInfo = (state)=>state.calculator.userInfo;
export const selectCalculatorError = (state)=>state.calculator.error;

export default calculatorSlice.reducer;