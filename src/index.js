import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NavBar from './components/NavBar';
import Inscription from './components/Inscription';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnnonceDetails from './components/AnnonceDetails';
import Connexion from './components/Connexion';
import UserProvider from './components/UserContext';
import Profil from './components/Profil';
import Publier from './components/Publier';
import Footer from './components/Footer';


ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="annonces">
          <Route path=":id" element={<AnnonceDetails />} />
          <Route path="edit/:id" element={<Publier />} />
          <Route path="nouveau" element={<Publier />} />
        </Route>
        <Route path="compte">
          <Route path="profil" element={<Profil />} />
          <Route path="favories" element={<App />} />
        </Route>
        <Route path="inscription" element={<Inscription />} />
        <Route path="connexion" element={<Connexion />} />
        <Route path="categorie/:categorie" element={<App />} />
      </Routes>
      <Footer />
    </UserProvider>
  </BrowserRouter >,
  document.getElementById('root')
);
