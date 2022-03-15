import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { delete_annonce } from "../dataBase/apiCalls";
import { URLS } from '../dataBase/apiURLS';
import './css/annonces.css';


export default function Annonce(props) {
    const annonce = props.annonce;
    const todayTime = Date.now();
    const expTime = new Date(annonce.date_expiration);
    const tempsRestant = new Date(expTime - todayTime).getTime();
    
    useEffect(() => {
        setTimeout(async () => {
            let deleted;
            try {
                deleted = await delete_annonce(annonce.id);
            }
            catch (err) {
                throw err;
            }
        }, tempsRestant); 
    })
// console.log(tempsRestant); 
// //3600000
    return (
        <>
            <div className='annonce'>
                <img src={annonce.image} alt="image" />
                <div>
                    <h3>{annonce.titre}</h3>
                    <div>Disponible à {annonce.nom_magasin}</div>
                    <div>Publiée le : {annonce.date_creation}</div>
                    <div>Expire le : {annonce.date_expiration}</div>
                    {
                        tempsRestant / 1000 / 60 / 60 < 24 &&
                        <div style={{ color: 'red' }}>Expire dans {Math.floor(tempsRestant / 1000 / 60 / 60)} heures !</div>
                    }
                    <div>Créé par : {annonce.utilisateur}</div>
                    <div>Categorie : {annonce.categorie.nom}</div>
                    <div>Description : {annonce.description}</div>
                    <Link to={`/annonces/{annonce.id}`}>Savoir plus</Link>
                </div>
            </div>
        </>
    );
}