import UserProvider, { UserContext } from "./UserContext";
import { Link, Navigate, Outlet, useNavigate, useParams, useResolvedPath } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { URLS } from "../dataBase/apiURLS";
import Annonce from './Annonce';
import "./css/Profil.css";
import profil from "./images/profil.jpg";
import CategorieTag from "./CategorieTag";

export default function Profil() {
    let action = URLS.delete_utilisateur;
    let navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const params = useParams();
    const [option, setOption] = useState('annonces');
    const [annonces, setAnnonces] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);


    const [updateUtilisateur, setUpdateUtilisateur] = useState({
        pseudo: user.pseudo,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        id: user.id,
    });

    useEffect(() => {
        let isMounted = true;
        fetch(`${URLS.annonces}?idUser=${user.id}`)
            .then(res => res.json())
            .then(res => {
                for (let i in res) {
                    if (isMounted) setAnnonces(a => [...a, res[i]])
                }
                if (isMounted) setIsLoaded(true);
            })
        fetch(URLS.categories, { cache: "force-cache" })
            //lecture de ce que le fetch a trouvé
            .then(res => res.json())
            .then(res => {
                let cats = [];
                for (let cat in res) {
                    cats.push(res[cat])
                }
                if (isMounted) setCategories(cats);
            })
    }, []);

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

    // console.log(user);

    const handleChange = (event) => {
        setUpdateUtilisateur({ ...updateUtilisateur, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        setOption('annonces');
        setUser(updateUtilisateur);
        fetch(URLS.update_utilisateur, {
            method: "POST",
            body: JSON.stringify(updateUtilisateur),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (!res.ok) {
                    //setMessage("Une erreur s'est produite lors de la mise à jour !")
                    setLoading(false)
                    throw Error("La mise à jour n'à pas été faite");
                }
                else return res.json();
            })
            .catch(e => console.log(e));
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
                            <li className="option" onClick={() => setOption('annonces')} style={{ backgroundColor: option === 'annonces' ? 'green' : 'orange' }}>Mes annonces</li>
                            <li className="option" onClick={() => setOption('listeFav')} style={{ backgroundColor: option === 'listeFav' ? 'green' : 'orange' }}>Ma liste de favorie</li>
                            <li className="option" onClick={() => setOption('modifCompte')} style={{ backgroundColor: option === 'modifCompte' ? 'green' : 'orange' }}>Modifier mon compte</li>
                        </ul>

                        {
                            option === 'annonces' &&
                            (
                                <div className="corps">
                                    {
                                        (annonces.length === 0) ?
                                            <div>
                                                <div>Vous n'avez publié aucune annonce pour l'instant ! <br />Cliquez sur le lien ci-dessous pour publier une annonce : </div>
                                                <div><Link to={"/annonces/nouveau"}>Publier une annonce</Link></div>
                                            </div>
                                            :
                                            <div className="corps">
                                                {
                                                    annonces.map(elementTab =>
                                                        <Annonce annonce={elementTab} key={elementTab.id} />
                                                    )
                                                }
                                            </div>
                                    }
                                </div>
                            )
                        }
                        {
                            option === 'listeFav' &&
                            (
                                <div className="corps">
                                    {

                                        (user.categoriesFav.length === 0) ?

                                            <div>
                                                <div>
                                                    Désolé, vous n'avez pas de favorie pour le moment.
                                                    Mais vous pouvez vous abonner à une catégorie dès maintenant ! <br />
                                                    Cliquez sur une catégorie ci-dessous et elle sera automatique ajoutée dans vos favories.
                                                </div>
                                                {
                                                    categories &&
                                                    categories.map(cat =>
                                                        <CategorieTag categorie={cat} />
                                                    )
                                                }
                                            </div>
                                            :
                                            <div>
                                                Voici la liste de vos favories :
                                                {
                                                    categories.map(cat =>
                                                        <CategorieTag categorie={cat} key={cat.id} />
                                                    )
                                                }
                                                <div>(Cliquez sur le "+" pour ajouter une nouvelle catégorie et clqiuez sur le "-" pour supprimer un catégorie)</div>
                                            </div>
                                    }
                                    {/* {
                                        categories &&
                                        categories.map(cat =>
                                            <CategorieTag categorie={cat} />
                                        )
                                    } */}
                                </div>
                            )
                        }

                        {
                            //Ne fonctionne toujours pas :/
                            option === 'modifCompte' &&
                            <div className="corps">
                                <h3>S'inscrire :</h3>
                                <form encType="multipart/form-data" method="POST" onSubmit={(e) => handleSubmit(e)}>
                                    <label>Pseudo :
                                        <input type='text' name='pseudo' defaultValue={updateUtilisateur.pseudo} onChange={handleChange} />
                                    </label>

                                    <label>Email :
                                        <input type="text" name="email" defaultValue={updateUtilisateur.email} onChange={handleChange} />
                                    </label>

                                    <label>Nom :
                                        <input type='text' name='nom' defaultValue={updateUtilisateur.nom} onChange={handleChange} />
                                    </label>

                                    <label>Prenom :
                                        <input type='text' name='prenom' defaultValue={updateUtilisateur.prenom} onChange={handleChange} />
                                    </label>

                                    <label>
                                        <input
                                            type="submit"
                                            value="Modifier mon compte"
                                        //disabled={!updateUtilisateur.pseudo || !updateUtilisateur.email || loading}
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
                    </div >
                </div >
            }
        </>
    );
}
