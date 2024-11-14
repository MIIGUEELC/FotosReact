import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetImagesThunk = createAsyncThunk("Search/GetImages", async () => {
  try {
    const request = await fetch(
      "https://api.unsplash.com/photos/random?count=21",
      {
        method: "GET",
        headers: {
          Authorization:
            "Client-ID lIBQnwA8xxcYbTlc8qcJZdjr4abRJXuB136Zuaebt74",
        },
      }
    );
    if (request.ok) {
      const Images = await request.json();
      console.log(Images);
      return Images;
    }
    throw new Error("error al cargar imagenes");
  } catch (error) {
    console.log(error);
    return [];
  }
});

export const GetSearchPhotoThunk = createAsyncThunk(
  "search/getSearchPhoto",
  async (text) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos/?per_page=100&query=${text}`,
        {
          headers: {
            Authorization:
              "Client-ID lIBQnwA8xxcYbTlc8qcJZdjr4abRJXuB136Zuaebt74",
          },
        }
      );
      if (response.ok) {
        const dataSearch = await response.json();
        console.log(dataSearch);
        return dataSearch.results;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }
);
