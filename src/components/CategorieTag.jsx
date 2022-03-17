import { useContext } from "react";
import { get_utilisateur, suivre_categorie } from "../dataBase/apiCalls";
import { URLS } from "../dataBase/apiURLS";
import { UserContext } from "./UserContext";

export default function CategorieTag(props) {
    const { user, setUser } = useContext(UserContext);

    const setFavorie = async (suivre) => {

        const data = {
            user_id: user.id,
            categorie_id: props.categorie.id,
            suivre: suivre
        }

        let abonnementReussi;
        try {
            abonnementReussi = await suivre_categorie(data);
            let updatedUser;
            if (abonnementReussi) {
                updatedUser = await get_utilisateur(user.id);
                if (updatedUser) setUser(updatedUser);
            }
        } catch (err) {
            throw Error('Erreur');
        }

    }

    return (
        <div className='cat'>
            {props.categorie.nom}
            <button onClick={() => setFavorie(user.categoriesFav && !user.categoriesFav.find(cat => cat.nom === props.categorie.nom))}>
                {user.categoriesFav && !!user.categoriesFav.find(cat => cat.nom === props.categorie.nom) ? '-' : '+'}
            </button>
        </div >
    );

}