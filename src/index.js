import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NavBar from './components/NavBar';
import Publier from './components/Publier';
import Inscription from './components/Inscription';
import Connexion from './components/Connexion';
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
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/id=:id" element={<AnnonceDetails />} />
      <Route path="/categorie/:categorie" element={<NavBar />} />
      <Route path="/edit/id=:id" element={<AnnonceDetails />} />

    </Routes>
  </BrowserRouter >,
  document.getElementById('root')
);
