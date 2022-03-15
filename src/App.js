import './App.css';

import Annonce from './components/Annonce';
import { useEffect, useState } from 'react';
import { URLS } from './dataBase/apiURLS';
import { useParams } from 'react-router-dom';


export default function App() {

  let urlData = useParams();
  let cat = urlData.categorie;

  const [annonces, setAnnonces] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [recherche, setRecherche] = useState('');
  const [categorie, setCategorie] = useState(cat);

  useEffect(() => {
    let isMounted = true;
    fetch(URLS.annonces, { cache: 'reload' })
      .then(res => res.json())
      .then(res => {
        for (let i in res) {
          if (isMounted) setAnnonces(a => [...a, res[i]])
        }
        if (isMounted) setIsLoaded(false);
      })
  }, []);


  const filtrer = (element) => {
    return element.titre.toLowerCase().includes(recherche.toLowerCase()) ||
      element.categorie.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      element.nom_magasin.toLowerCase().includes(recherche.toLowerCase());
  }

  let categorieAnnonce = [];
  if (cat) {
    annonces.forEach(element => {
      if (element.categorie.nom === cat) {
        categorieAnnonce.push(element);
      }
    });
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
            <div>Chargement en cours…</div>
            :
            cat ?
            (categorieAnnonce.length === 0) ?
                <div>
                  Nous n'avons aucune dans la catégorie selectionné !
                </div>
                :
                categorieAnnonce
                  .filter(annonce => filtrer(annonce))
                  .map(elementTab =>
                    <Annonce annonce={elementTab} key={elementTab.id} />
                  )
              :
              annonces
                .filter(annonce => filtrer(annonce))
                .map(elementTab =>
                  <Annonce annonce={elementTab} key={elementTab.id} />
                )
          }
        </div>
      </div>
    </div>
  );
}

