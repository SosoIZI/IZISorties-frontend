import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, username: null,email: null},
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      signUp: (state, action) => {// Pour s'inscrire
        state.value.token = action.payload.token;
        state.value.email = action.payload.email
        state.value.username = action.payload.username;
        state.value.email = action.payload.email
      },
      
      signIn: (state, action) => { // Pour se connecter
        state.value.username = action.payload.username
        state.value.token = action.payload.token
        state.value.email = action.payload.email
      },

      logout: (state, action) => {//pour se deconnecter
        state.value.token = null;
        state.value.username = null;
        state.value.email = null;
      },
    
    },
  });
  
  export const { signIn, signUp, logout } = userSlice.actions;
  export default userSlice.reducer;