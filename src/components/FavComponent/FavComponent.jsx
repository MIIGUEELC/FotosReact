import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { IconsFavoriteComponent } from '../IconFavComponent/IconFavComponent';
import { ModalComponent } from '../ModalComponent/ModalComponent';
import "../ImagesComponent/PhotosComponent.css";
import { editDescription } from '../../feature/favorite/FavoriteSlice'; 
import './FavComponent.css'; 

export const FavoritesComponent = () => {
  const dispatch = useDispatch(); 
  const favorites = useSelector((state) => state.favorite.data); 
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isOpenModal, setIsOpenModal] = useState(false);

  if (favorites.length === 0) {
    return <p className='WarningFav'>No favorites added yet... Go Home to add new photos!</p>;
  }

 
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

  return (
    <div className="image-list">
      {favorites.map((favorite, index) => (
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

      {isOpenModal && selectedImage && (
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
      )}
    </div>
  );
};
