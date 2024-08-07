import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import baseUrl from "../config/config";
import handleUnauthorized from "../utils/handleUnauthorized";

// Async Thunk for add product to saves from the API
export const addProductToSaves = createAsyncThunk(
  "saves/addProductToSaves",
  async (requestBody, { getState }) => {
    const state = getState();
    const JWTToken = state.cookies.JWTToken;

    const response = await fetch(`${baseUrl}/saves`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWTToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    handleUnauthorized(response);

    const data = await response.json();

    return data;
  }
);

// Async Thunk for remove product from saves from the API
export const removeProductFromSaves = createAsyncThunk(
  "saves/removeProductFromSaves",
  async (productId, { getState }) => {
    const state = getState();
    const JWTToken = state.cookies.JWTToken;

    const response = await fetch(`${baseUrl}/saves/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWTToken}`,
      },
    });

    handleUnauthorized(response);

    const data = await response.json();

    return data;
  }
);

// Async Thunk for fetch saves from the API
export const fetchSaves = createAsyncThunk(
  "fetchSaves/fetchSaves",
  async (queryParams, { getState }) => {
    const url = new URL(`${baseUrl}/saves`);
    url.search = new URLSearchParams(queryParams).toString();

    const state = getState();
    const JWTToken = state.cookies.JWTToken;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWTToken}`,
      },
    });

    handleUnauthorized(response);

    const data = await response.json();

    return data;
  }
);

const savesSlice = createSlice({
  name: "saves",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add product to saves
      .addCase(addProductToSaves.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductToSaves.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(addProductToSaves.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Remove product from saves
      .addCase(removeProductFromSaves.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeProductFromSaves.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(removeProductFromSaves.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const fetchSavesSlice = createSlice({
  name: "fetchSaves",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch saves
      .addCase(fetchSaves.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSaves.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchSaves.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const savesReducer = savesSlice.reducer;
export const fetchSavesReducer = fetchSavesSlice.reducer;
