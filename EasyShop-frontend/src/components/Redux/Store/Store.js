import { configureStore } from "@reduxjs/toolkit";
import { userStore } from "../Slice/UserSlice";

export const store = configureStore({
  reducer: {
    userStore,
  },
});
