import React, { useEffect, useState } from "react";


// import { FooterComponent } from "../components/FooterComponent/FooterComponent";
// import { HeaderComponent } from "../components/HeaderComponent/HeaderComponent";

import { ImageComponent } from "../components/ImagesComponent/PhotosComponent";
import { LayoutComponent } from "../components/LayoutComponent/LayoutComponente";
import "../components/ImagesComponent/PhotosComponent.css"

export const IndexPage = () => {
  
    return (
        <>
            
           <LayoutComponent/>
            <ImageComponent />
            
        </>
    );
};
