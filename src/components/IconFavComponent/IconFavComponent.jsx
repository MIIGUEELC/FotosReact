
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addFavorite, removeFavorite } from "../../feature/favorite/FavoriteSlice";
import { toast } from "sonner"; // Librería para los avisos
import { saveAs } from 'file-saver';  // Librería para descargar
import './IconsComponent.css';

export const IconsFavoriteComponent = ({ image, id, description, likes, date, width, height, openModal }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorite.data);
  const [isFavorite, setIsFavorite] = useState(false);

  
  useEffect(() => {
    const isImageFavorite = favorites.some((fav) => fav.id === id);
    setIsFavorite(isImageFavorite);
  }, [favorites, id]);

  // Alterna entre agregar y quitar de favoritos
  const toggleFavoriteHandler = () => {
    if (isFavorite) {
      dispatch(removeFavorite(id));
      toast.success('Borrado de favoritos!');
    } else {
      dispatch(addFavorite({ id, image, description, likes, date, width, height }));
      toast.success('Añadido a favoritos!');
    }
    setIsFavorite(!isFavorite);
  };

  
  const downloadImage = () => {
   
    const extension = image.includes('.png') ? 'png' : 'jpg';
    const fileName = `image-${id}.${extension}`;
    saveAs(image, fileName); 
    toast.success('Descarga iniciada!');
  };

  return (
    <div className="IconsComponent">

      <span
        className="material-icons IconsComponent__Icon"
        onClick={toggleFavoriteHandler}
      >
        {isFavorite ? 'favorite' : 'favorite_border'}
      </span>


      <span
        className="material-icons IconsComponent__Icon"
        onClick={openModal}
      >
        edit
      </span>

      {/* Icono para descargar */}
      <span
        className="material-icons IconsComponent__Icon"
        onClick={downloadImage}
      >
        download
      </span>
    </div>
  );
};

