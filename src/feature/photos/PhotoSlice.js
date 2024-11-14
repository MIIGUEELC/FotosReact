import { createSlice } from "@reduxjs/toolkit";
import { GetImagesThunk, GetSearchPhotoThunk } from "./PhotoThunk";

export const PhotoSlice = createSlice({
  name: "Myphoto",
  initialState: {
    status: "idle",
    data: [],
    error: null,
  },
  reducers: {
    addFavoritesPhoto: (state, action) => {
      state.data.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.data));
    },
    removeFavoritesPhoto: (state, action) => {
      state.data = state.data.filter((image) => image.id !== action.payload.id);
      localStorage.setItem("favorites", JSON.stringify(state.data));
    },
    modifyPhotoDescription: (state, action) => {
      state.data = state.data.map((image) => {
        if (image.id === action.payload.id) {
          image.description = action.payload.description;
        }
        return image;
      });
      localStorage.setItem("favorites", JSON.stringify(state.data));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetImagesThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(GetImagesThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(GetImagesThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(GetSearchPhotoThunk.pending, (state) => {
        state.status =  "pending";
        state.error = false;
      })
      .addCase(GetSearchPhotoThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(GetSearchPhotoThunk.rejected, (state) => {
        state.status = "rejected";
        state.error = false;

      });

  },
});

export const {
  addFavoritesPhoto,
  removeFavoritesPhoto,
  modifyPhotoDescription,
} = PhotoSlice.actions;

export default PhotoSlice.reducer;
