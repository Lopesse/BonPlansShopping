import { useContext } from "react";
import { get_utilisateur, suivre_categorie } from "../dataBase/apiCalls";
import { UserContext } from "./UserContext";
import plus from './images/plus.png';
import minus from './images/minus.png';

export default function CategorieTag(props) {
    const { user, setUser } = useContext(UserContext);

    const setFavorie = async (suivie) => {

        const data = {
            user_id: user.id,
            categorie_id: props.categorie.id,
            suivie: suivie
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
            <div>{props.categorie.nom}</div>
            {
                user &&
                <button onClick={() => { setFavorie(user.categoriesFav && !!user.categoriesFav.find(cat => cat.nom === props.categorie.nom)) }}>
                    <img style={{ width: 10 }} src={user.categoriesFav && !!user.categoriesFav.find(cat => cat.nom === props.categorie.nom) ? minus : plus} />
                </button>
            }
        </div >
    );

}