import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import baseUrl from "../config/config";
import { deleteCookie } from "./cookiesSlice";

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
    return data;
  }
);

// Async Thunk for authLogOut
export const authLogOut = createAsyncThunk(
  "auth/authLogOut",
  async (_, { dispatch }) => {
    dispatch(deleteCookie({ name: "JWTToken" }));
    return true;
  }
);

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
      })
      // Log out
      .addCase(authLogOut.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authLogOut.fulfilled, (state) => {
        state.status = "succeeded";
        state.data = null;
      })
      .addCase(authLogOut.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
