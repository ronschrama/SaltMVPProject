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
  },
});

export const {
  loggingIn,
} = login.actions;

export default login.reducer;
