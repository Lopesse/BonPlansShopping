import UserProvider, { UserContext } from "./UserContext";
import { Link, Navigate, Outlet, useNavigate, useParams, useResolvedPath } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { URLS } from "../dataBase/apiURLS";
import Annonce from './Annonce';
import "./css/Profil.css";
import profil from "./images/profil.jpg";
import CategorieTag from "./CategorieTag";
import { delete_utilisateur, get_annonces, get_categories, get_utilisateur, update_utilisateur } from "../dataBase/apiCalls";

export default function Profil() {
    let navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const params = useParams();
    const [option, setOption] = useState('annonces');
    const [annonces, setAnnonces] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);


    const [updateUtilisateur, setUpdateUtilisateur] = useState({
        pseudo: "",
        email: "",
        nom:"",
        prenom: "",
        id: "",
    });

    useEffect(async () => {
        let mesAnnonces;
        try {
            if(user){
                mesAnnonces = await get_annonces(user.id);
                setAnnonces(mesAnnonces);
                setUpdateUtilisateur({
                    pseudo: user.pseudo,
                    email: user.email,
                    nom: user.nom,
                    prenom: user.prenom,
                    id: user.id
                })
            }
        } catch (err) {
            throw err;
        }

        let cats;
        try {
            cats = await get_categories();
            setCategories(cats);
        } catch (err) {
            throw err;
        }

    }, []);

    const deleteCompte = async () => {

        let deleted;

        try {
            deleted = await delete_utilisateur(user.id);
            if (deleted) {
                navigate(`/`);
                setUser(null);
                localStorage.removeItem('user');
            }
        } catch (err) {
            throw err;
        }
    }


    const handleChange = (event) => {
        setUpdateUtilisateur({ 
            ...updateUtilisateur, 
            [event.target.name]: event.target.value 
        });
    }

    const updateUser = async (event) => {
        event.preventDefault();
        setLoading(true);


        let newUser;
        let updatedUser;
        try {
            updatedUser = await update_utilisateur(updateUtilisateur);
            if (updatedUser) {
                try {
                    newUser = await get_utilisateur(user.id);
                    setUser(newUser);
                } catch (err) {
                    throw err;
                }
            }
            setLoading(false);
        } catch (err) {
            throw err;
        }

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
                                <form encType="multipart/form-data" method="POST" onSubmit={(e) => updateUser(e)}>
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
                                <button onClick={() => deleteCompte()}>
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
