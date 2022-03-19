import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { delete_annonce } from "../dataBase/apiCalls";
import { URLS } from '../dataBase/apiURLS';
import './css/annonces.css';

export default function Annonce(props) {
    const annonce = props.annonce;
    const todayTime = new Date();
    const expTime = new Date(annonce.date_expiration).getTime();
    const tempsRestant = new Date(expTime - todayTime.getTime()).getTime();   
    const publieLe = new Date(annonce.date_creation).getHours();
    const ilya = todayTime.getHours() - publieLe;
    console.log(ilya)
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

    return (
        <>
            <div className='annonce'>
                {   
                    annonce.image ?
                        <img className="img" src={require('../../api/upload/' + annonce.image)} alt="img" />
                    :
                    <img className="img" src={require('./images/noImage.png')} alt="img" />
                }
                <div>
                    <h3>{annonce.titre}</h3>
                    <div>Disponible à {annonce.nom_magasin}</div>
                    {
                        ilya <= 1 &&
                        <div>Publiée il y a moins d'une heure</div>
                    }
                    {
                        ilya > 1 &&
                        ilya < 24 &&
                        <div>Publiée il y a {ilya} heures</div>
                    }
                    {
                        ilya > 24 &&
                        <div>Publiée il y a {Math.floor(ilya/24)} jours</div>
                    }
                    <div>Expire le : {annonce.date_expiration}</div>
                    {
                        tempsRestant / 1000 / 60 / 60 < 24 &&
                        <div style={{ color: 'red' }}>Expire dans {Math.floor(tempsRestant / 1000 / 60 / 60)} heures !</div>
                    }
                    <div>Créé par : {annonce.utilisateur}</div>
                    <div>Categorie : {annonce.categorie.nom}</div>
                    <div>Description : {annonce.description}</div>
                    <img src=''></img>
                    <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" />
                    <Link to={`/annonces/${annonce.id}`}>Savoir plus</Link>
                </div>
            </div>
        </>
    );
}