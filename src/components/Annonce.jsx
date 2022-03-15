import { useContext, useEffect } from "react";
import { Link } from "react-router-dom"
import { URLS } from '../dataBase/apiURLS';
import './css/annonces.css';


export default function Annonce(props) {
    const annonce = props.annonce;

    useEffect(() => {
        const todayTime = Date.now();
        const expTime = new Date(annonce.date_expiration).getTime();
        const tempsRestant = expTime - todayTime;
        setTimeout(() => {
            fetch(URLS.delete_annonce, {
                method: "POST",
                body: JSON.stringify({ id: annonce.id }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }, tempsRestant);
    })


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
                        new Date(new Date(annonce.date_expiration) - Date.now()).getHours() < 24 &&
                        <div style={{ color: 'red' }}>Expire dans {new Date(new Date(annonce.date_expiration) - Date.now()).getHours()} heures !</div>
                    }
                    <div>Créé par : {annonce.utilisateur}</div>
                    <div>Categorie : {annonce.categorie.nom}</div>
                    <div>Description : {annonce.description}</div>
                    <Link to={`/annonces/${annonce.id}`}>Savoir plus</Link>
                </div>
            </div>
        </>
    );
}