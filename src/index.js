import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NavBar from './components/NavBar';
import Publier from './components/Publier';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnnonceDetails from './components/AnnonceDetails';


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/profil" element={<NavBar />} />
      <Route path="/compte" element={<NavBar />} />
      <Route path="/favories" element={<NavBar />} />
      <Route path="/nouveau" element={<Publier />} />
      <Route path="/id=:id" element={<AnnonceDetails />} />
      <Route path="/categorie/:categorie" element={<NavBar />} />

    </Routes>
  </BrowserRouter >,
  document.getElementById('root')
);
