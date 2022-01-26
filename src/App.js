import './App.css';
import Annonce from './components/Annonce';

import { useEffect, useState } from 'react';
import { URLS } from './dataBase/apiURLS';


export default function App() {


  const [annonces, setAnnonces] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recherche, setRecherche] = useState('');


  useEffect(() => {
    let isMounted = true;
    fetch(URLS.annonces, { cache: 'reload' })
      .then(res => res.json())
      .then(res => {
        for (let i in res) {
          if (isMounted) setAnnonces(a => [...a, res[i]])
        }
        if (isMounted) setIsLoaded(true);
      })
  }, []);


  const filtrer = (element) => {
    return element.titre.toLowerCase().includes(recherche.toLowerCase()) ||
      element.categorie.toLowerCase().includes(recherche.toLowerCase()) ||
      element.nom_magasin.toLowerCase().includes(recherche.toLowerCase());
  }


  return (
    <div className='app'>
      <div className='page_principale'>
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
              <div>Loading...</div>
          }
        </div>
      </div>
    </div>
  );
}

