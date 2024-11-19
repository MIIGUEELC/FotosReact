


// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux'; 
// import { IconsFavoriteComponent } from '../IconFavComponent/IconFavComponent';
// import { ModalComponent } from '../ModalComponent/ModalComponent';
// import "../ImagesComponent/PhotosComponent.css";
// import { editDescription } from '../../feature/favorite/FavoriteSlice'; 
// import './FavComponent.css'; 

// export const FavoritesComponent = () => {
//   const dispatch = useDispatch(); 
//   const favorites = useSelector((state) => state.favorite.data); 
//   const [selectedImage, setSelectedImage] = useState(null); 
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   const [sortCriteria, setSortCriteria] = useState(""); // Estado para el criterio de ordenamiento

//   const openModalHandler = (image) => {
//     setSelectedImage(image);
//     setIsOpenModal(true);
//   };

//   const closeModalHandler = () => {
//     setIsOpenModal(false);
//     setSelectedImage(null); 
//   };

//   const updateDescriptionHandler = (newDescription) => {
//     dispatch(editDescription({ 
//       id: selectedImage.id, 
//       description: newDescription 
//     })); 
//     closeModalHandler(); 
//   };

//   // Función para ordenar los favoritos según el criterio
//   const sortedFavorites = () => {
//     if (!sortCriteria) return favorites; // Si no hay criterio, no ordenar

//     const sorted = [...favorites].sort((a, b) => {
//       if (sortCriteria === "likes") {
//         return b.likes - a.likes; 
//       } else if (sortCriteria === "height") {
//         return b.height - a.height; 
//       } else if (sortCriteria === "width") {
//         return b.width - a.width; 
//       } else if (sortCriteria === "date") {
//         return new Date(b.date) - new Date(a.date); 
//       }
//       return 0;
//     });

//     return sorted;
//   };

//   if (favorites.length === 0) {
//     return <p className='WarningFav'>Aún no tienes favoritos... ¡añade algunos!</p>;
//   }

//   return (
//     <div>
      
//       <div className="container-sort">
//         <select
//           id="sort"
//           value={sortCriteria}
//           onChange={(e) => setSortCriteria(e.target.value)} // Actualiza el criterio
//         >
//           <option value="" disabled>Order by:</option>
//           <option value="height">Height</option>
//           <option value="width">Width</option>
//           <option value="likes">Likes</option>
//           <option value="date">Date Added</option>
//         </select>
//       </div>

     
//       <div className="image-list">
//         {sortedFavorites().map((favorite, index) => (
//           <div className="ImagesContainer" key={index}>
//             <img 
//               src={favorite.image} 
//               alt={favorite.description} 
//               className="ImagesContainer__img"
//               width={favorite.width}
//               height={favorite.height}
//               onClick={() => openModalHandler(favorite)} 
//             />
//             <div className="ImagesContainer__data">
//               <p className="data__text">
//                 <strong>Likes:</strong> {favorite.likes}
//               </p>
//               <p className="data__text">
//                 <strong>Date:</strong> {favorite.date}
//               </p>
//               <p className="data__text">
//                 <strong>Description:</strong> {favorite.description}
//               </p>
//               <IconsFavoriteComponent
//                 image={favorite.image}
//                 id={favorite.id}
//                 description={favorite.description}
//                 likes={favorite.likes}
//                 date={favorite.date}
//                 width={favorite.width}
//                 height={favorite.height}
//                 openModal={() => openModalHandler(favorite)}
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       {isOpenModal && selectedImage ? (
//   <ModalComponent
//     isOpen={isOpenModal}
//     onClose={closeModalHandler}
//     description={selectedImage.description}
//     width={selectedImage.width}
//     height={selectedImage.height}
//     likes={selectedImage.likes}
//     date={selectedImage.date}
//     onSubmit={updateDescriptionHandler} 
//   />
// ) : null}
//     </div>
//   );
// };



import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { IconsFavoriteComponent } from '../IconFavComponent/IconFavComponent';
import { ModalComponent } from '../ModalComponent/ModalComponent';
import "../ImagesComponent/PhotosComponent.css";
import { editDescription } from '../../feature/favorite/FavoriteSlice'; 
import './FavComponent.css'; 

export const FavoritesComponent = () => {
  const dispatch = useDispatch(); 

  // Obtener favoritos desde Redux
  const favorites = useSelector((state) => state.favorite.data); 

  // Obtener el término de búsqueda global desde Redux
  const searchTerm = useSelector((state) => state.favorite.searchTerm);

  const [selectedImage, setSelectedImage] = useState(null); 
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sortCriteria, setSortCriteria] = useState(""); // Estado para el criterio de ordenamiento

  const openModalHandler = (image) => {
    setSelectedImage(image);
    setIsOpenModal(true);
  };

  const closeModalHandler = () => {
    setIsOpenModal(false);
    setSelectedImage(null); 
  };

  const updateDescriptionHandler = (newDescription) => {
    dispatch(editDescription({ 
      id: selectedImage.id, 
      description: newDescription 
    })); 
    closeModalHandler(); 
  };

  // Filtrar favoritos según el término de búsqueda global
  const filteredFavorites = () => {
    if (!searchTerm) return favorites; // Si no hay término de búsqueda, no filtrar

    const lowercasedTerm = searchTerm.toLowerCase();
    return favorites.filter((favorite) => 
      favorite.description.toLowerCase().includes(lowercasedTerm) ||
      favorite.date.includes(lowercasedTerm) ||
      String(favorite.likes).includes(lowercasedTerm) // Permite buscar por likes, descripción o fecha
    );
  };

  // Ordenar favoritos según el criterio
  const sortedFavorites = () => {
    const filtered = filteredFavorites(); // Aplicar primero el filtro
    if (!sortCriteria) return filtered;

    const sorted = [...filtered].sort((a, b) => {
      if (sortCriteria === "likes") {
        return b.likes - a.likes; 
      } else if (sortCriteria === "height") {
        return b.height - a.height; 
      } else if (sortCriteria === "width") {
        return b.width - a.width; 
      } else if (sortCriteria === "date") {
        return new Date(b.date) - new Date(a.date); 
      }
      return 0;
    });

    return sorted;
  };

  if (favorites.length === 0) {
    return <p className='WarningFav'>Aún no tienes favoritos... ¡añade algunos!</p>;
  }

  return (
    <div>
      {/* Menú para ordenar */}
      <div className="container-sort">
        <select
          id="sort"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)} // Actualiza el criterio
        >
          <option value="" disabled>Order by:</option>
          <option value="height">Height</option>
          <option value="width">Width</option>
          <option value="likes">Likes</option>
          <option value="date">Date Added</option>
        </select>
      </div>

      {/* Lista de favoritos */}
      <div className="image-list">
        {sortedFavorites().map((favorite, index) => (
          <div className="ImagesContainer" key={index}>
            <img 
              src={favorite.image} 
              alt={favorite.description} 
              className="ImagesContainer__img"
              width={favorite.width}
              height={favorite.height}
              onClick={() => openModalHandler(favorite)} 
            />
            <div className="ImagesContainer__data">
              <p className="data__text">
                <strong>Likes:</strong> {favorite.likes}
              </p>
              <p className="data__text">
                <strong>Date:</strong> {favorite.date}
              </p>
              <p className="data__text">
                <strong>Description:</strong> {favorite.description}
              </p>
              <IconsFavoriteComponent
                image={favorite.image}
                id={favorite.id}
                description={favorite.description}
                likes={favorite.likes}
                date={favorite.date}
                width={favorite.width}
                height={favorite.height}
                openModal={() => openModalHandler(favorite)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpenModal && selectedImage ? (
        <ModalComponent
          isOpen={isOpenModal}
          onClose={closeModalHandler}
          description={selectedImage.description}
          width={selectedImage.width}
          height={selectedImage.height}
          likes={selectedImage.likes}
          date={selectedImage.date}
          onSubmit={updateDescriptionHandler} 
        />
      ) : null}
    </div>
  );
};


