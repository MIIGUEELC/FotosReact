
// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { GetSearchPhotoThunk } from "../../feature/photos/PhotoThunk";
// import montaña from "/src/assets/montaña.png";
// import picsworld from "/src/assets/picsworld.png";
// import "./HeaderComponent.css";

// export const HeaderComponent = () => {
//   const dispatch = useDispatch();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // Maneja la búsqueda al presionar Enter
//   const handleSearch = (event) => {
//     if (event.key === "Enter" && searchTerm.trim() !== "") {
//       dispatch(GetSearchPhotoThunk(searchTerm));
//     }
//   };

//   // Alterna el menú hamburguesa
//   const toggleMenu = () => {
//     setIsMenuOpen((prev) => !prev);
//   };

//   return (
//     <header className="HeaderContainer" style={{ backgroundImage: `url(${montaña})` }}>
//       <div className="HeaderContainerimg">
//         <img src={picsworld} alt="Logo" className="HeaderContainer__imagen1" />

        
//         <nav className="HeaderContainer__Menu">
//           <NavLink to="/" className="HeaderContainer__Menu--item">Home</NavLink>
//           <NavLink to="/MyPhotos" className="HeaderContainer__Menu--item">My Photos</NavLink>
//         </nav>

        
//         <div className="hamburger-icon" onClick={toggleMenu}>
//           &#9776;
//         </div>

//         {/* Menú desplegable para móvil */}
//         {isMenuOpen && (
//           <nav className="HeaderContainer__DropdownMenu ${isMenuOpen ? 'open' : ''}">
//             <NavLink to="/" className="HeaderContainer__DropdownMenu--item" onClick={toggleMenu}>
//               Home
//             </NavLink>
//             <NavLink to="/MyPhotos" className="HeaderContainer__DropdownMenu--item" onClick={toggleMenu}>
//               My Photos
//             </NavLink>
//           </nav>
//         )}
//       </div>

//       <div className="HeaderContainer__search">
//         <input
//           type="text"
//           placeholder="Buscar fotos en pics world"
//           className="HeaderContainer__searchInput"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyDown={handleSearch} // Ejecuta la búsqueda al presionar Enter
//         />
//       </div>
//     </header>
//   );
// };


import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetSearchPhotoThunk } from "../../feature/photos/PhotoThunk";
import montaña from "/src/assets/montaña.png";
import picsworld from "/src/assets/picsworld.png";
import "./HeaderComponent.css";

export const HeaderComponent = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Maneja la búsqueda al presionar Enter
  const handleSearch = (event) => {
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      dispatch(GetSearchPhotoThunk(searchTerm));
    }
  };

  // Alterna el menú hamburguesa
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
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
  );
};


