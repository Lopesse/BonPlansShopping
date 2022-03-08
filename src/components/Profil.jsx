import { useContext } from "react";
import UserProvider, { UserContext } from "./UserContext";
import { URLS } from "../dataBase/apiURLS";
import { useNavigate } from "react-router-dom";


export default function Profil() {
    const { user, setUser } = useContext(UserContext);
    let action = URLS.delete_utilisateur;
    let navigate = useNavigate();

    const deleteCompte = () => {
        console.log(user)
        fetch(action, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (!res.ok) {
                throw Error('Erreur de suppression');
            }
            else return res.json();
        })
        .then(json => {navigate(`/`) })
        .catch(e => console.log(e));
        
        if(user){
            setUser(null); 
            localStorage.removeItem('user');
        }
    }

    return (
        <>
            {
                user &&
                <div>{user.pseudo}</div>
            }
            <button 
                onClick={deleteCompte}
            >
                Supprimer mon compte
            </button>
        </>
    );
}