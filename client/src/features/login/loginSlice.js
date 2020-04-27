import { createSlice } from '@reduxjs/toolkit';

const login = createSlice({
  name: 'login',
  initialState: {
    loggedIn: false,
    userType: null,
  },
  reducers: {
    loggingIn: (state) => {
      state.loggedIn = true;
    },
    loggingOut: (state) => {
      state.loggedIn = false;
    },
    setUserTypeUser: (state) => {
      state.userType = 3;
    },
    setUserTypeAdmin: (state) => {
      state.userType = 2;
    },
    setUserTypeSuperAdmin: (state) => {
      state.userType = 1;
    },
    removeUserType: (state) => {
      state.userType = 3;
    },
  },
});

export const {
  loggingIn,
  loggingOut,
  setUserTypeUser,
  setUserTypeAdmin,
  setUserTypeSuperAdmin,
} = login.actions;

export default login.reducer;
