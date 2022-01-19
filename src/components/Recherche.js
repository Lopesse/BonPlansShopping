import React from 'react'
import './Recherche.css'

function Recherche() {
    return (
        <>
            <div className='Recherche'>
                <input type='text' 
                name='searchBar' 
                id='searchBar' 
                placeholder='Recherchez ici'/>
            </div>
            <div className='resultats'>
                <div className='resultat'> résultats </div>
            </div>
        </>
    )
}

export default Recherche