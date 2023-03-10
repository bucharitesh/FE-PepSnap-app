/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  setVuplexData: null,
};

export const vuplexSlice = createSlice({
  name: 'vuplexData',
  initialState,
  reducers: {
    setVuplexData: (state: any, action: any) => {
      state.vuplexData = { ...state.vuplexData, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setVuplexData } = vuplexSlice.actions;

export default vuplexSlice.reducer;
