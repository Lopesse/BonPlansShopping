import { useContext } from "react";
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext";

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
    return (
        <>
            <div className=''>
                <div>{annonce.titre}</div>
                <div>Disponible à {annonce.nom_magasin}</div>
                <div>Expire le: {annonce.date_expiration}</div>
                <div>Créé par: {annonce.utilisateur}</div>
                <div>Categorie: {annonce.categorie}</div>
                <Link to={`/id=${annonce.id}`}>Savoir plus</Link>
            </div>
        </>
    );
}