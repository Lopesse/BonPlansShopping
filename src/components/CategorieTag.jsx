import { useContext } from "react";
import { URLS } from "../dataBase/apiURLS";
import { UserContext } from "./UserContext";

export default function CategorieTag(props) {
    const { user, setUser } = useContext(UserContext);



    const setFavorie = () => {
        const data = {
            user_id: user.id,
            categorie_id: props.categorie.id
        }
        console.log(data)
        fetch(URLS.suivre_categorie, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.log(err))
    }

    return (
        <div className='cat'>
            {props.categorie.nom}
            <img src={'./images/plus.png'} onClick={setFavorie}></img>
        </div>
    );

}