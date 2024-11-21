// store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.email = '';
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
