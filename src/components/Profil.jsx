import UserProvider, { UserContext } from "./UserContext";
import { Link, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { URLS } from "../dataBase/apiURLS";
import Annonce from './Annonce';
import "./css/Profil.css";
import profil from "./images/profil.jpg";
import { log } from "util";
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

    useEffect(() => {
        let isMounted = true;
        fetch(URLS.annonces, { cache: 'reload' })
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
            .then(json => {
                setUser(null);
                localStorage.removeItem('user');
                navigate(`/`);
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
                            <div className="corps">
                                {
                                    annonces.map(elementTab =>
                                        <Annonce annonce={elementTab} key={elementTab.id} />
                                    )
                                }

                            </div>
                        }
                        {
                            option === 'listeFav' &&
                            (
                                user.categoriesFav ?
                                    user.categoriesFav.map(cat =>
                                        <div key={cat.id}>
                                            Voici la liste de vos favories :
                                            <div className="cat" key={cat.id}>
                                                {cat.nom}
                                            </div>
                                            <select
                                                name="categorie"
                                                id="categorie"
                                            // onChange={handleChange}
                                            // defaultValue={annonce.categorie}
                                            >
                                                {
                                                    categories &&
                                                    categories.map(cat =>
                                                        <option value={cat.id} key={cat.id}>{cat.categorie}</option>
                                                    )
                                                }
                                            </select>
                                            <div className="bouton">
                                                <button>
                                                    S'abonner
                                                </button>
                                                <button>
                                                    Se désabonner
                                                </button>
                                            </div>
                                        </div>
                                    )
                                    :
                                    <div>
                                        <div className="corps">
                                            Désolé, vous n'avez pas de favorie pour le moment.
                                            Mais vous pouvez vous abonner à une catégorie dès maintenant ! <br />
                                            Cliquez sur une catégorie ci-dessous et elle sera automatique ajoutée dans vos favories.
                                        </div>
                                        <div className="catFav">
                                            {

                                                categories &&
                                                categories.map((item, index) =>
                                                    <CategorieTag categorie={item} />
                                                )
                                            }
                                        </div>
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

