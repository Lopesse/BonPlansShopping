import './App.css';
import NavBar from './components/NavBar';
import Footer from "./components/Footer";

import { useState } from 'react';

export default function App() {
  return (
    <div className='page_principale'>
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <Footer />
      </div>
    </div>
  );
}

