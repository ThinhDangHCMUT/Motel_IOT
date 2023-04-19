import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
      isLogin: false,
      
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
   
   
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.isLogin = true;
    },
    loginFalse: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.success = true;
    },
    registerFalse: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
    }, 
    logout: (state) => {
      state.login.isLogin = false;
      state.login.currentUser = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFalse,
  registerFalse,
  registerSuccess,
  registerStart,
  logout,
} = authSlice.actions;

export default authSlice.reducer;