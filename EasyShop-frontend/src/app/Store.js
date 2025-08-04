import { configureStore } from "@reduxjs/toolkit";
import { userStore } from "../features/UserSlice";

export const store = configureStore({
  reducer: {
    userStore,
  },
});
