import './ModalComponent.css';
import { useState, useEffect } from 'react';

export const ModalComponent = ({ isOpen, onClose, description, onSubmit, width, height, likes, date }) => {
  const [newDescription, setNewDescription] = useState(description);

  useEffect(() => {
    setNewDescription(description); // Actualizar la descripción localmente cuando se abre el modal
  }, [description]);

  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value); // Actualizar el estado de la descripción cuando el usuario escribe
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(newDescription); // Envía la nueva descripción al componente padre (FavoritesComponent)
    onClose(); // Cierra el modal
  };

  return isOpen ? (
    <div className="ModalComponent__overlay">
      <form className='ModalComponent__form' onSubmit={handleSubmit}>
        <div className='ModalComponent'>
          <span className="material-symbols-outlined ModalComponent__Close" onClick={onClose}>
            Cancel
          </span>
          <h2 className="ModalComponent__Title">Edit Description</h2>
          <textarea
            className="ModalComponent__Description"
            value={newDescription}
            onChange={handleDescriptionChange}
            placeholder="Enter a new description"
          ></textarea>
          <ul className="ModalComponent__list">
            <li className="ModalComponent__list__item">
              <p className="ModalComponent__list__item__definicion">Width:</p> {width}
            </li>
            <li className="ModalComponent__list__item">
              <p className="ModalComponent__list__item__definicion">Height:</p> {height}
            </li>
            <li className="ModalComponent__list__item">
              <p className="ModalComponent__list__item__definicion">Likes:</p> {likes}
            </li>
            <li className="ModalComponent__list__item">
              <p className="ModalComponent__list__item__definicion">Date:</p> {date}
            </li>
          </ul>
          <button type='submit' className='ModalComponent__form__send'>
            Save
          </button>
        </div>
      </form>
    </div>
  ) : null;
};
