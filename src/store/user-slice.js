import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    formIsValid: false,
  },
  reducers: {
    validateForm(state, action) {
      state.formIsValid = action.payload;
    },
  },
});

export const userActions = userSlice.actions; // need for dispatching

export default userSlice;
