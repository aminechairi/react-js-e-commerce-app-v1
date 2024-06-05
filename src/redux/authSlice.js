import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import baseUrl from "../config/config";
import cookieManager from "../utils/cookieManager";

// Async Thunk for authLogIn
export const authLogIn = createAsyncThunk("auth/logIn", async (requestBody) => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  const data = await response.json();

  if (data.token) {
    cookieManager("set", "JWTToken", data.token, 90);
  }

  return data;
});

// Async Thunk for authSignUp
export const authSignUp = createAsyncThunk(
  "auth/signUp",
  async (requestBody) => {
    const response = await fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();

    if (data.token) {
      cookieManager("set", "JWTToken", data.token, 90);
    }

    return data;
  }
);

// Async Thunk for logout
// export const logout = createAsyncThunk(
//   "auth/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       localStorage.removeItem("token");
//       return {};
//     } catch (error) {
//       return rejectWithValue("Logout failed");
//     }
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Log in
      .addCase(authLogIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authLogIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(authLogIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Sign up
      .addCase(authSignUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authSignUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(authSignUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // Log out
    // .addCase(logout.fulfilled, (state) => {
    //   state.status = "idle";
    //   state.user = null;
    //   state.token = null;
    //   state.error = null;
    // })
    // .addCase(logout.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.payload;
    // });
  },
});

export default authSlice.reducer;
