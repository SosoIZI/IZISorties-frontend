import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, username: null, firstname: null},
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      signUp: (state, action) => {
        state.value.token = action.payload.token;
        state.value.email = action.payload.email
        state.value.username = action.payload.username;
      
      },
      
      signIn: (state, action) => {
        state.value.username = action.payload.username
        state.value.token = action.payload.token
      },

      logout: (state, action) => {
        state.value.token = null;
        state.value.username = null;
        state.value.firstname = null;
      },
    },
  });
  
  export const { signIn, signUp, logout } = userSlice.actions;
  export default userSlice.reducer;