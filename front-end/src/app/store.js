import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../feature/auth.slice";
import userSlice from "../feature/user.slice";

export default configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
});
