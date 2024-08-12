import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {geoloc: null}
};

export const searchSlice = createSlice({
    name: 'search',
   
     initialState,
    reducers: {

    addGeoloc: (state, action) => {
        state.value.geoloc = action.payload
    }
    },
   });
   
   export const { addGeoloc } = searchSlice.actions;
   export default searchSlice.reducer;
   