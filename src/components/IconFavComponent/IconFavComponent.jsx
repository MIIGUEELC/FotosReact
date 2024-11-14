import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addFavorite, removeFavorite } from "../../feature/favorite/FavoriteSlice";
import { toast } from "sonner";
import { saveAs } from 'file-saver';
import './IconsComponent.css'; 

export const IconsFavoriteComponent = ({ image, id, description, likes, date, width, height, openModal }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorite.data);
  const [isFavorite, setIsFavorite] = useState(false); 

  useEffect(() => {
    const isImageFavorite = favorites.some((fav) => fav.id === id);
    setIsFavorite(isImageFavorite);
  }, [favorites, id]);

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

  return (
    <div className="IconsComponent">
      <span
        className="material-icons IconsComponent__Icon"
        onClick={toggleFavoriteHandler}
      >
        {isFavorite ? 'favorite' : 'favorite_border'}
      </span>
      <span className="material-icons IconsComponent__Icon" onClick={openModal}>edit</span>
      <span className="material-icons IconsComponent__Icon" onClick={() => saveAs(image)}>download</span>
    </div>
  );
};
