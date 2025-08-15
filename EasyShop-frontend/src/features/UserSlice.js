import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosUserInstance } from "../services/UserAPIcall";

export const userFetch = createAsyncThunk("user/fetchData", async ({ method = "get", payload = {}, url = "" }, { rejectWithValue }) => {
  try {
    if (method == "get") {
      const res = await axiosUserInstance[method](url);

      return res.data;
    } else {
      const res = await axiosUserInstance[method](url, payload);
      return res.data;
    }
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data?.message) {
      return rejectWithValue(error.response.data.message); // সার্ভারের error message
    }
    return rejectWithValue(error); // নেটওয়ার্ক বা অন্য error
  }
});

export const userLogout = createAsyncThunk("user/logOout", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosUserInstance.get("/join/logout");
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const ThemeToggle = createAsyncThunk("user/theme-toggle", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosUserInstance.get("/join/theme-toggle");
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const resetPassOTP = createAsyncThunk("user/resetPassOTP", async ({ email }, { rejectWithValue }) => {
  try {
    const res = await axiosUserInstance.post("/join/reset-pass-otp", { email });
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const resetOTPTOKenCreate = createAsyncThunk("user/OTPTokenCreate", async ({ email, otp }, { rejectWithValue }) => {
  try {
    const res = await axiosUserInstance.post("/join/reset_password_otp_token", { email, otp });
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: true,
    error: null,
    message: "",
  },
  reducers: {
    userObserve: (state, action) => {
      state.user = action.payload;
      console.log(state.user);
      state.loading = false;
    },
    resetstate: (state) => {
      ((state.user = null), (state.loading = false), (state.error = null));
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
        state.theme = action.payload.payLoad.isDarkMode;
        console.log(action);
      })
      .addCase(userFetch.rejected, (state, action) => {
        state.loading = false;
        state.error = action;
      })
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;

        state.error = action;
      })
      .addCase(resetPassOTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        state.message = action;
      })
      .addCase(resetPassOTP.rejected, (state, action) => {
        state.loading = false;
        state.message = "";
        state.error = action?.payload?.response?.data;
      })
      .addCase(ThemeToggle.pending, (state) => {
        state.loading = false;
      })
      .addCase(ThemeToggle.fulfilled, (state, action) => {
        state.loading = false;
        state.theme = action?.payload?.payLoad?.isDarkMode;
      })
      .addCase(ThemeToggle.rejected, (state, action) => {
        state.loading = false;
        state.message = "";
        state.error = action;
      })
      .addCase(resetOTPTOKenCreate.pending, (state) => {
        state.loading = false;
      })
      .addCase(resetOTPTOKenCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.message = { action, state: "success" };
      })
      .addCase(resetOTPTOKenCreate.rejected, (state, action) => {
        state.loading = false;
        state.message = "";
        state.error = action;
      });
  },
});

export const userStore = UserSlice.reducer;
export const { userObserve, resetstate } = UserSlice.actions;
