import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { IndexPage } from './pages/IndexPage'
import { MyPhotosPage } from './pages/MyPhotosPage'
import { ImageComponent } from './components/ImagesComponent/PhotosComponent.jsx'
import { FavoritesComponent } from './components/FavComponent/FavComponent.jsx'
import { Provider } from "react-redux"
import {store} from "./app/store.js"
import { Toaster } from 'sonner';

import { LayoutComponent } from './components/LayoutComponent/LayoutComponente.jsx'
import './main.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <Toaster position="top-right"  />
    <BrowserRouter>
        <Routes> 
          <Route element={<LayoutComponent />}>
            <Route path="/" element={<ImageComponent />} /> 
            <Route path="/MyPhotos" element={<FavoritesComponent />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </React.StrictMode>
)
