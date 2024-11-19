// import { createSlice } from "@reduxjs/toolkit";

// export const FavoriteSlice = createSlice({
//   name: "favorite",
//   initialState: {
//     status: "idle",
//     data: (JSON.parse(localStorage.getItem("favorites")) || []).filter(
//       (item) => item !== null
//     ),
//     error: null,
//   },

//   reducers: {
//     addFavorite: (state, action) => {
//       state.data.push(action.payload);
//       localStorage.setItem("favorites", JSON.stringify(state.data));
//     },

//     removeFavorite: (state, action) => {
//       const idToRemove = action.payload;
//       if (idToRemove == null) {
//         console.error("Id no valido:", idToRemove);
//         return;
//       }
//       state.data = state.data.filter(
//         (image) => image && image.id !== idToRemove
//       );
//       localStorage.setItem("favorites", JSON.stringify(state.data));
//     },

//     editDescription: (state, action) => {
//       state.data = state.data.map((image) => {
//         if (image && image.id === action.payload.id) {
//           image.description = action.payload.description;
//         }
//         return image;
//       });
//       localStorage.setItem("favorites", JSON.stringify(state.data));
//     },
//   },
// });

// export const { addFavorite, removeFavorite, editDescription } =
//   FavoriteSlice.actions;


//   export default FavoriteSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

export const FavoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    status: "idle",
    data: (JSON.parse(localStorage.getItem("favorites")) || []).filter(
      (item) => item !== null
    ),
    error: null,
    searchTerm: "", // Nuevo estado para el término de búsqueda
  },

  reducers: {
    addFavorite: (state, action) => {
      state.data.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.data));
    },

    removeFavorite: (state, action) => {
      const idToRemove = action.payload;
      if (idToRemove == null) {
        console.error("Id no válido:", idToRemove);
        return;
      }
      state.data = state.data.filter(
        (image) => image && image.id !== idToRemove
      );
      localStorage.setItem("favorites", JSON.stringify(state.data));
    },

    editDescription: (state, action) => {
      state.data = state.data.map((image) => {
        if (image && image.id === action.payload.id) {
          image.description = action.payload.description;
        }
        return image;
      });
      localStorage.setItem("favorites", JSON.stringify(state.data));
    },

    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload; // Actualiza el término de búsqueda
    },

    clearSearchTerm: (state) => {
      state.searchTerm = ""; // Limpia el término de búsqueda
    },
  },
});

export const { 
  addFavorite, 
  removeFavorite, 
  editDescription, 
  updateSearchTerm, 
  clearSearchTerm 
} = FavoriteSlice.actions;

export default FavoriteSlice.reducer;
