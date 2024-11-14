import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { IndexPage } from './pages/IndexPage'
import { MyPhotosPage } from './pages/MyPhotosPage'
import { Provider } from "react-redux"
import {store} from "./app/store.js"
import { Toaster } from 'sonner';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <Toaster position="top-right"  />
    <BrowserRouter>
      <Routes>
        <Route path="" element={<IndexPage/>} />
        <Route path="/MyPhotos" element={<MyPhotosPage />} />
        
      </Routes>
    </BrowserRouter>
    </Provider>
    </React.StrictMode>
)
