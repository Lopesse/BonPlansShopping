import UserProvider, { UserContext } from "./UserContext";
import { Link, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { URLS } from "../dataBase/apiURLS";
import "./css/Profil.css";
import profil from "./images/profil.jpg";

export default function Profil() {
    let action = URLS.delete_utilisateur;
    let navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const params = useParams();
    const [text, setText] = useState('');
    const [compte, setCompte] = useState();

    const option = (op) => {
        setText(op);
    }

    useEffect(() => {
        let isMounted = true;
        let userID;
        const utilisateur = localStorage.getItem('user');
        if (utilisateur) {
            userID = JSON.parse(utilisateur).value;
        }

        if (userID) {
            fetch(`${URLS.get_utilisateur}?id=${userID}`)
                .then(res => res.json())
                .then(json => {
                    if (json !== -1)
                        if (isMounted) setCompte(json)
                })
                .catch(e => console.log(e))
        }
    }, []);

    console.log(compte['nom']);
    console.log('^pto');

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
            <div className="compte">
                <div className="profil">
                    <img className="profilImg" src={profil}></img>
                    <div>{user.nom} {user.prenom}</div>
                    <div>{user.email}</div>
                </div>
                <div className="options">
                    <ul> 
                        <li className="option" onClick={() => option('annonce')}>Mes annonces</li>
                        <li className="option" onClick={() => option('listeFav')}>Ma liste de favorie</li>
                        <li className="option" onClick={() => option('modifCompte')}>Modifier mon compte</li>
                    </ul>

                    {
                        (text == 'annonce') ? 
                            <div className="corps">
                                azertyuiop
                                azertyuiop
                                azertyuiop
                                azertyuiop
                                azertyuiop
                                azertyuiop
                                azertyuiop
                                azertyuiop
                            </div>
                            : (text == 'listeFav') ?
                                <div className="corps">
                                    zertyugvc jgfjdvfù
                                    vfeubjke
                                </div>
                                : 
                                <div className="corps">
                                    <h3>S'inscrire :</h3>
                                    {/* {message && <div className="erreur">{message}</div>} */}
                                    <form encType="multipart/form-data" method="POST">
                                        <label>Pseudo :
                                            <input type='text' name='pseudo' defaultValue={compte['pseudo']} />
                                        </label>

                                        <label>Email :
                                            <input type="text" name="email" defaultValue={compte['email']}/>
                                        </label>

                                        <label>Nom :
                                            <input type='text' name='nom' defaultValue={compte['nom']}/>
                                        </label>

                                        <label>Prenom :
                                            <input type='text' name='prenom' defaultValue={compte['prenom']}/>
                                        </label>

                                        <label>
                                            <input
                                                type="submit"
                                                value="Modifier mon compte"
                                                // disabled={!newUtilisateur.pseudo || !newUtilisateur.email || newUtilisateur.mdp !== newUtilisateur.confirmMDP || loading}
                                            />
                                        </label>
                                    </form>
                                    <div>Changer mon mot de passe </div>

                                    <div>Cliquez sur ce bouton pour supprimer votre compte. La suppression du compte sera définitive. </div>
                                    <button onClick={deleteCompte}>
                                        Supprimer mon compte
                                    </button> 
                                </div>
                    }
                </div>
            </div>
        </>
    );
}

