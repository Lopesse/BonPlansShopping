import './App.css';
import NavBar from './components/NavBar';
import Footer from "./components/Footer";
import Annonce from './components/Annonce';

import { useEffect, useState } from 'react';
import { URLS } from './dataBase/apiURLS';
import Recherche from './components/Recherche';


export default function App() {

  const tab = [
    {
      titre:"mama",
      categorie:"Danse",
    },
    {
      titre:"ily",
      categorie:"Boisson",
    }
  ];
  const [annonces, setAnnonces] = useState(tab);
  const [recherche, setRecherche] = useState('');
  


  // useEffect(() => {
  //   fetch(URLS.annonces)
  //     .then(res => res.json())
  //     .then(res => {
  //       for (let i in res) {
  //         setAnnonces(a => [...a, res[i]])
  //       }
  //     })
  // }, []);


  return (
    <div className='page_principale'>
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <div className='Recherche'>
          <input type='text' 
                value={recherche}
                name='searchBar' 
                placeholder='Recherchez ici'
                onChange={e => setRecherche(e.target.value) }/>
        </div>
        <div className='resultats'>
          <div className='resultat'> {recherche} </div>
        </div>
        {
          annonces
          .filter(annonce => annonce.titre.toLowerCase().includes(recherche.toLowerCase()) ||  annonce.categorie.toLowerCase().includes(recherche.toLowerCase()))
          .map(elementTab =>
            <Annonce annonce={elementTab} /> 
          )
        }
        <Footer />
      </div>
    </div>
  );
}

