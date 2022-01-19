import './App.css';
import NavBar from './components/NavBar';
import Footer from "./components/Footer";
import Annonce from './components/Annonce';

import { useEffect, useState } from 'react';
import { URLS } from './dataBase/apiURLS';


export default function App() {


  const [annonces, setAnnonces] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recherche, setRecherche] = useState('');

  useEffect(() => {
    fetch(URLS.annonces)
      .then(res => res.json())
      .then(res => {
        for (let i in res) {
          setAnnonces(a => [...a, res[i]])
        }
        setIsLoaded(true);
      })
  }, []);


  const filtrer = (element) => {
    return element.titre.toLowerCase().includes(recherche.toLowerCase()) ||
      element.categorie.toLowerCase().includes(recherche.toLowerCase()) ||
      element.nom_magasin.toLowerCase().includes(recherche.toLowerCase());
  }


  return (
    <div className='page_principale'>
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <div className='recherche'>
          <input
            type='text'
            value={recherche}
            name='searchBar'
            placeholder='Recherchez ici'
            onChange={e => setRecherche(e.target.value)}
          />
        </div>
        <div className='liste_annonces'>
          {
            isLoaded ?
              annonces
                .filter(annonce => filtrer(annonce))
                .map(elementTab =>
                  <Annonce annonce={elementTab} key={elementTab.id} />
                )
              :
              <img src={'../spinning-loading.gif'}></img>
          }
        </div>
        <Footer />
      </div>
    </div>
  );
}

