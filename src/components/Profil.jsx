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
    const [option, setOption] = useState('');


    const deleteCompte = () => {
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
            .then(json => { navigate(`/`) })
            .catch(e => console.log(e));

        if (user) {
            setUser(null);
            localStorage.removeItem('user');
        }
    }


    const getAnnonces = () => {

    }

    return (
        <>
            {
                user &&
                <div className="compte">
                    <div className="profil">
                        <img className="profilImg" src={profil}></img>
                        <div>{user.nom} {user.prenom}</div>
                        <div>{user.email}</div>
                    </div>
                    <div className="options">
                        <ul>
                            <li className="option" onClick={() => setOption('annonce')} style={{ backgroundColor: option === 'annonce' ? 'green' : 'orange' }}>Mes annonces</li>
                            <li className="option" onClick={() => setOption('listeFav')} style={{ backgroundColor: option === 'listeFav' ? 'green' : 'orange' }}>Ma liste de favorie</li>
                            <li className="option" onClick={() => setOption('modifCompte')} style={{ backgroundColor: option === 'modifCompte' ? 'green' : 'orange' }}>Modifier mon compte</li>
                        </ul>

                        {
                            option === 'annonce' &&
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
                        }
                        {
                            option === 'listeFav' &&
                            user.categoriesFav &&
                            user.categoriesFav.map(cat =>
                                <div className="corps" key={cat.id}>
                                    {cat.nom}
                                </div>
                            )
                        }
                        {
                            option === 'modifCompte' &&
                            <div className="corps">
                                <h3>S'inscrire :</h3>
                                <form encType="multipart/form-data" method="POST">
                                    <label>Pseudo :
                                        <input type='text' name='pseudo' defaultValue={user.pseudo} />
                                    </label>

                                    <label>Email :
                                        <input type="text" name="email" defaultValue={user.email} />
                                    </label>

                                    <label>Nom :
                                        <input type='text' name='nom' defaultValue={user.nom} />
                                    </label>

                                    <label>Prenom :
                                        <input type='text' name='prenom' defaultValue={user.prenom} />
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
            }
        </>
    );
}

