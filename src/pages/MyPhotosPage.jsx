import React from "react";
import { HeaderComponent } from "../components/HeaderComponent/HeaderComponent";
import { FooterComponent } from "../components/FooterComponent/FooterComponent";
import { FavoritesComponent } from "../components/FavComponent/FavComponent";

export const MyPhotosPage = () => {

    return (
<>
<HeaderComponent />
<FavoritesComponent />  
    <FooterComponent />
    </>)
}