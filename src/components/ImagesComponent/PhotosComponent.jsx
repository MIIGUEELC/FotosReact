import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PhotosComponent.css";
import { GetImagesThunk, GetSearchPhotoThunk } from "../../feature/photos/PhotoThunk";
import { IconsFavoriteComponent } from "../IconFavComponent/IconFavComponent";
import { ModalComponent } from "../ModalComponent/ModalComponent"; 

export const ImageComponent = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.Myphoto.data);
  const imagesStatus = useSelector((state) => state.Myphoto.status);
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

  useEffect(() => {
    if (imagesStatus === "idle") {
      dispatch(GetImagesThunk());
    }
  }, [imagesStatus, dispatch]);

  // Función para ordenar las imágenes según el criterio
  const sortedImages = () => {
    if (!sortCriteria) return images; // Si no hay criterio no ordena nada

    const sorted = [...images].sort((a, b) => {
      if (sortCriteria === "likes") {
        return b.likes - a.likes; 
      } else if (sortCriteria === "height") {
        return b.height - a.height; 
      } else if (sortCriteria === "width") {
        return b.width - a.width; 
      } else if (sortCriteria === "created_at") {
        return new Date(b.created_at) - new Date(a.created_at); 
      }
      return 0; 
    });

    return sorted;
  };

  return (
    <div>
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
          <option value="created_at">Date Added</option>
        </select>
      </div>

      <div className="image-list">
        {imagesStatus === "pending" ? (
          <p>Loading...</p>
        ) : images.length > 0 ? (
          sortedImages().map((image, index) => ( 
            <div className="ImagesContainer" key={index}>
              <img
                className="ImagesContainer__img"
                src={image.urls.regular}
                alt={image.alt_description || "Image"}
                width={image.width}
                height={image.height}
                onClick={() => openModalHandler(image)}
              />
              <div className="ImagesContainer__data">
                <p className="data__text">
                  <strong>Author:</strong> {image.user.name}
                </p>
                <p className="data__text">
                  <strong>Likes:</strong> {image.likes}
                </p>
                <p className="data__text">
                  <strong>Date:</strong> {new Date(image.created_at).toLocaleDateString()}
                </p>

                <IconsFavoriteComponent
                  image={image.urls.full}
                  id={image.id}
                  description={image.alt_description}
                  likes={image.likes}
                  date={new Date(image.created_at).toLocaleDateString()}
                  width={image.width}
                  height={image.height}
                  openModal={() => openModalHandler(image)}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No hay imágenes encontradas, prueba otra búsqueda.</p>
        )}
      </div>

      {isOpenModal && selectedImage && (
        <ModalComponent
          isOpen={isOpenModal}
          onClose={closeModalHandler}
          description={selectedImage.alt_description}
          width={selectedImage.width}
          height={selectedImage.height}
          likes={selectedImage.likes}
          date={new Date(selectedImage.created_at).toLocaleDateString()}
          onSubmit={(newDescription) => {
            console.log("New description:", newDescription);
            closeModalHandler();
          }}
        />
      )}
    </div>
  );
};
