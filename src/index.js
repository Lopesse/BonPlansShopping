import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NavBar from './components/NavBar';
import Inscription2 from './components/Inscription2';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnnonceDetails from './components/AnnonceDetails';
import Connexion2 from './components/Connexion2';
import UserProvider from './components/UserContext';
import Profil from './components/Profil';
import Publier2 from './components/Publier2';


ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/compte" element={<NavBar />} />
        <Route path="/favories" element={<NavBar />} />
        <Route path="/nouveau" element={<Publier2 />} />
        <Route path="/inscription" element={<Inscription2 />} />
        <Route path="/connexion" element={<Connexion2 />} />
        <Route path="/id=:id" element={<AnnonceDetails />} />
        <Route path="/categorie/:categorie" element={<App />} />
        <Route path="/edit/id=:id" element={<AnnonceDetails />} />
      </Routes>
    </UserProvider>
  </BrowserRouter >,
  document.getElementById('root')
);
