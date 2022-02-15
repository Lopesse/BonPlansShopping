import { useContext } from "react";
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext";
import './css/annonces.css';


/*
interface Annonce {
    id: number
    titre: String
    description: String
    categorie: String
    sous_categorie: String
    date_xpiration: String
    nom_magasin: String
    adresse_magasin: String
    utilisateur: String
    image: String
}
*/

export default function Annonce(props) {
    const annonce = props.annonce;
    // let urlData = new URLSearchParams(window.location.search);
    // let cat = urlData.get('categorie');
    // console.log(cat);
    
    return (
        <>
            <div className='annonce'>
                {/* { cat ? 
                    annonce.categorie == cat ? 
                    <div>
                        <img src={annonce.image} alt="image" />
                        <div>
                            <h3>{annonce.titre}</h3>
                            <div>Disponible à {annonce.nom_magasin}</div>
                            <div>Publiée le : {annonce.date_creation}</div>
                            <div>Expire le : {annonce.date_expiration}</div>
                            <div>Créé par : {annonce.utilisateur}</div>
                            <div>Categorie : {annonce.categorie}</div>
                            <div>Description : {annonce.description}</div>
                            <Link to={`annonces/${annonce.id}`}>Savoir plus</Link>
                        </div>
                    </div>
                    :
                    <div>
                        Aucune annonce ne correspond à cette catégorie 
                    </div>

                : */}
                <img src={annonce.image} alt="image" />
                <div>
                    <h3>{annonce.titre}</h3>
                    <div>Disponible à {annonce.nom_magasin}</div>
                    <div>Publiée le : {annonce.date_creation}</div>
                    <div>Expire le : {annonce.date_expiration}</div>
                    <div>Créé par : {annonce.utilisateur}</div>
                    <div>Categorie : {annonce.categorie}</div>
                    <div>Description : {annonce.description}</div>
                    <Link to={`annonces/${annonce.id}`}>Savoir plus</Link>
                </div>

                {/* } */}
            </div>
        </>
    );
}