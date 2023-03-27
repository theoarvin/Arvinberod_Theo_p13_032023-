import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    error: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload;
    },
    loginFail(state, action) {
      state.error = action.payload.error;
    },
  },
});

export const { loginSuccess, loginFail } = authSlice.actions;
export default authSlice.reducer;
