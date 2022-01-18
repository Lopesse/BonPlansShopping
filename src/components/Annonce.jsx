import { Link } from "react-router-dom"

/*
interface Annonce {
    id: number
    titre: String
    Categorie: String
    sousCategorie: String
    Expiration: String
    Description: String
    utilisateur: String
    image: String
}
*/

export default function Annonce(props) {
    const annonce = props.annonce;

    return (
        <>
            <div>
                <div>{annonce.titre}</div>
                <div>Cree par: {annonce.utilisateur}</div>
                <div>Categorie: {annonce.categorie}</div>
                <div>Expire le: {annonce.date_expiration}</div>
                <Link to={`/id=${annonce.id}`}>Savoir plus</Link>
            </div>
        </>
    );
}