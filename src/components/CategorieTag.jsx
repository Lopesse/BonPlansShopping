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
        // fetch(URLS.suivre_categorie, {
        //     method: "POST",
        //     body: JSON.stringify(data),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        //     .then(res => res.json())
        //     .then(json => {
        //         fetch(`${URLS.get_utilisateur}?id=${user.id}`)
        //             .then(res => res.json())
        //             .then(json => json !== -1 && setUser(json))
        //             .catch(e => console.log(e))
        //     })
        //     .catch(err => console.log(err));
    }

    return (
        <div className='cat' > 
            <div>{props.categorie.nom}</div>
            {
                user &&
                <button onClick={()=>{setFavorie(user.categoriesFav && !!user.categoriesFav.find(cat => cat.nom === props.categorie.nom))}}>
                    <div>{user.categoriesFav && user.categoriesFav.find(cat => cat.nom === props.categorie.nom) ? '-' : '+'}</div>
                </button>
            }
        </div >
    );

}