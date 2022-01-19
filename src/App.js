import './App.css';
import NavBar from './components/NavBar';
import Footer from "./components/Footer";
import Annonce from './components/Annonce';

import { useEffect, useState } from 'react';
import { URLS } from './dataBase/apiURLS';
import Recherche from './components/Recherche';


export default function App() {

  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    fetch(URLS.annonces)
      .then(res => res.json())
      .then(res => {
        for (let i in res) {
          setAnnonces(a => [...a, res[i]])
        }
      })
  }, []);


  return (
    <div className='page_principale'>
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        {
          annonces.map(annonce =>
            <Annonce annonce={annonce} key={annonce.id} />
          )
        }
        <Recherche/>
        <Footer />
      </div>
    </div>
  );
}

