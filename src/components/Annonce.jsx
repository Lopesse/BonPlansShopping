import { Link } from "react-router-dom"
import './css/annonces.css';


export default function Annonce(props) {
    const annonce = props.annonce;
    return (
        <>
            <div className='annonce'>
                <img src={annonce.image} alt="image" />
                <div>
                    <h3>{annonce.titre}</h3>
                    <div>Disponible à {annonce.nom_magasin}</div>
                    <div>Publiée le : {annonce.date_creation}</div>
                    <div>Expire le : {annonce.date_expiration}</div>
                    <div>Créé par : {annonce.utilisateur}</div>
                    <div>Categorie : {annonce.categorie.nom}</div>
                    <div>Description : {annonce.description}</div>
                    <Link to={`/annonces/${annonce.id}`}>Savoir plus</Link>
                </div>
            </div>
        </>
    );
}