import { useContext } from "react";
import { URLS } from "../dataBase/apiURLS";
import { UserContext } from "./UserContext";

export default function CategorieTag(props) {
    const { user, setUser } = useContext(UserContext);
    console.log(user.categoriesFav)

    const setFavorie = (suivre) => {

        const data = {
            user_id: user.id,
            categorie_id: props.categorie.id,
            suivre: suivre
        }

        fetch(URLS.suivre_categorie, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(json => {
                fetch(`${URLS.get_utilisateur}?id=${user.id}`)
                    .then(res => res.json())
                    .then(json => json !== -1 && setUser(json))
                    .catch(e => console.log(e))
            })
            .catch(err => console.log(err));
    }

    user.categoriesFav.map(elementTab =>
        console.log(elementTab['nom'])
    );

    return (
        <div className='cat'>
            {props.categorie.nom}
            <button onClick={() => setFavorie(user.categoriesFav && !user.categoriesFav.find(cat => cat.nom === props.categorie.nom))}>
                {user.categoriesFav && !!user.categoriesFav.find(cat => cat.nom === props.categorie.nom) ? '-' : '+'}
            </button>
        </div >
    );

}