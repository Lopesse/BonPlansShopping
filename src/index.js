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
import Footer from './components/Footer';


ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="annonces">
          <Route path=":id" element={<AnnonceDetails />} />
          <Route path="edit/:id" element={<AnnonceDetails />} />
          <Route path="nouveau" element={<Publier2 />} />
        </Route>
        <Route path="compte">
          <Route path="profil" element={<Profil />} />
          <Route path="favories" element={<App />} />
        </Route>
        <Route path="inscription" element={<Inscription2 />} />
        <Route path="connexion" element={<Connexion2 />} />
        <Route path="categorie/:categorie" element={<App />} />
      </Routes>
      <Footer />
    </UserProvider>
  </BrowserRouter >,
  document.getElementById('root')
);
