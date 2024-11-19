// src/components/LayoutComponent/LayoutComponent.jsx
import React, { useRef, useState, useEffect } from "react";
import { Outlet, NavLink, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetSearchPhotoThunk } from "../../feature/photos/PhotoThunk";
import montaña from "/src/assets/montaña.png";
import picsworld from "/src/assets/picsworld.png";


import "./LayoutComponent.css";

export const LayoutComponent = () => {
    const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Alterna el menú de navegación
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  

  const handleSearch = (event) => {
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      dispatch(GetSearchPhotoThunk(searchTerm));
    }
  };

  return (
    <>
    <header className="HeaderContainer" style={{ backgroundImage: `url(${montaña})` }}>
      <div className="HeaderContainerimg">
        <img src={picsworld} alt="Logo" className="HeaderContainer__imagen1" />

        <nav className="HeaderContainer__Menu">
          <NavLink to="/" className="HeaderContainer__Menu--item">Home</NavLink>
          <NavLink to="/MyPhotos" className="HeaderContainer__Menu--item">My Photos</NavLink>
        </nav>

        <div className="hamburger-icon" onClick={toggleMenu}>
          &#9776;
        </div>

        {/* Menú desplegable para móvil */}
        {isMenuOpen && (
          <nav className={`HeaderContainer__DropdownMenu ${isMenuOpen ? 'open' : ''}`}>
            <NavLink to="/" className="HeaderContainer__DropdownMenu--item" onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink to="/MyPhotos" className="HeaderContainer__DropdownMenu--item" onClick={toggleMenu}>
              My Photos
            </NavLink>
          </nav>
        )}
      </div>

      <div className="HeaderContainer__search">
        <input
          type="text"
          placeholder="Buscar fotos en pics world"
          className="HeaderContainer__searchInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch} // Ejecuta la búsqueda al presionar Enter
        />
      </div>
    </header>
    <main className="main">
                <Outlet />
      </main>
    <footer className='FooterContainer'>
        <img></img>
        <h2 className='FooterComponent__text'>PICS WORLD @Copyright</h2>
        
    </footer>

      
    </>
  );
};
