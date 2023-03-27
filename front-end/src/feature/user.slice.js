import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
  },
  reducers: {
    getUserData(state, action) {
      state.userData = action.payload;
    },
    editUserData(state, action) {
      state.userData = action.payload;
    },
  },
});

export const { getUserData, editUserData } = userSlice.actions;
export default userSlice.reducer;
