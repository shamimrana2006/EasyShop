import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosUserInstance } from "../../Axios/UserAPIcall";

export const userFetch = createAsyncThunk("user/fetchData", async ({ payload = {}, url = "" }) => {
  try {
    return await axiosUserInstance
      .post(url, payload)
      .then((res) => {
        // console.log(res.data);

        return res.data;
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    userObserve: (state, action) => {
      state.user = action.payload;
      console.log(state.user);
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userFetch.pending, (state) => {
        state.loading = true;
      })
      .addCase(userFetch.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action);

        state.user = action.payload;
      })
      .addCase(userFetch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const userStore = UserSlice.reducer;
export const { userObserve } = UserSlice.actions;
