import { useContext } from "react";
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext";
import './css/annonces.css';
import { URLS } from "../dataBase/apiURLS";


export default function Annonce(props) {
    const annonce = props.annonce;  
    
    const todayTime = Date.now();
    const expTime = new Date(annonce.date_expiration).getTime();
    const tempsRestant = expTime - todayTime;
    console.log(tempsRestant);

    setTimeout(() => { 
        fetch(URLS.delete_annonce, {
            method: "POST",
            body: JSON.stringify({ id: annonce.id }),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }, tempsRestant);


    return (
        <>
            <div className='annonce'>
                <img src={annonce.image} alt="image" />
                <div>
                    <h3>{annonce.titre}</h3>
                    <div>Disponible à {annonce.nom_magasin}</div>
                    <div>Publiée le : {annonce.date_creation}</div>
                    <div>Expire le : {annonce.date_expiration} </div>
                    <div>Créé par : {annonce.utilisateur}</div>
                    <div>Categorie : {annonce.categorie}</div>
                    <div>Description : {annonce.description}</div>
                    <Link to={`/annonces/${annonce.id}`}>Savoir plus</Link>
                </div>
            </div>
        </>
    );
}