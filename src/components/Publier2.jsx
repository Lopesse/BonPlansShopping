import "./NavBar.css"
import "./formulaire.css"
import { URLS } from "../dataBase/apiURLS";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { Link, useNavigate } from "react-router-dom";

export default function Publier2() {
    const { user, setUser } = useContext(UserContext);
    const [newAnnonce, setNewAnnonce] = useState({
        titre: '',
        dateCreation: '',
        dateExpiration: '',
        magasin: '',
        adresse: '',
        categorie: '',
        sous_categorie: '',
        image: '',
        description: '',
        categories: [],
        sous_categories: []
    });

    const [categories, setCategories] = useState([]);
    const [sousCategories, setSousCategories] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    const handleChange = (event) => {
        setNewAnnonce({ ...newAnnonce, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        let date = new Date();
        date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        const data = {
            titre: newAnnonce.titre,
            dateCreation: date,
            dateExpiration: newAnnonce.dateExpiration,
            nomMagasin: newAnnonce.magasin,
            adresseMagasin: newAnnonce.adresse,
            categorie: newAnnonce.categorie,
            sousCategorie: newAnnonce.sous_categorie,
            image: newAnnonce.image,
            utilisateur: user.id,
            description: newAnnonce.description
        };

        console.log(data);

        fetch(URLS.creer_annonce, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (!res.ok) {
                    setMessage("Une erreur s'est produite. L'annonce n'a pas été crée. Veuillez essayer plus tard.")
                    setLoading(false)
                    throw Error('Annonce non crée');
                }
                else return res.json();
            })
            .then(json => { setLoading(false); navigate(`/annonces/${json}`) })
            .catch(e => console.log(e));
    }

    useEffect(() => {
        let isMounted = true
        fetch(URLS.categories)
            .then(res => res.json())
            .then(res => {
                let cats = []
                for (let i in res) {
                    cats.push(res[i])
                }
                if (isMounted) setCategories(cats)
                if (isMounted) setNewAnnonce({ categorie: cats[0].id })
            });

        fetch(URLS.sous_categories)
            .then(res => res.json())
            .then(res => {
                let cats = []
                for (let i in res) {
                    cats.push(res[i])
                }
                if (isMounted) setSousCategories(cats)
                if (isMounted) setNewAnnonce({ sous_categorie: cats[0].id })
            });
    }, [])


    return (
        <div className="app">
            {
                // user ?

                <div className="formulaire">
                    <h3>Publier une nouvelle annonce :</h3>
                    {message && <div>{message}</div>}
                    <form encType="multipart/form-data" method="POST" onSubmit={handleSubmit}>

                        <label>Titre de l'annonce :
                            <input type='text' name='titre' placeholder='Le titre' onChange={handleChange} />
                        </label>

                        <label>Magasin :
                            <input type="text" name="magasin" placeholder="Le magasin de l'annonce utilisateur" onChange={handleChange} />
                        </label>

                        <label>Adresse de l'annonce :
                            <input type='text' name='adresse' placeholder="adresse de l'annonce" onChange={handleChange} />
                        </label>

                        <label>
                            Categorie de l'annonce :
                            <select
                                name="categorie"
                                id="categorie"
                                onChange={handleChange}
                                defaultValue={categories && categories[0]}
                            >
                                {
                                    categories &&
                                    categories.map(cat =>
                                        <option value={cat.id} key={cat.id}>{cat.categorie}</option>
                                    )
                                }
                            </select>
                        </label>
                        {
                            sousCategories &&
                            <label>
                                Sous categorie de l'annonce :
                                <select
                                    name="sous_categorie"
                                    id="sous_categorie"
                                    onChange={handleChange}
                                    defaultValue={newAnnonce.sous_categorie}
                                >
                                    {
                                        sousCategories &&
                                        sousCategories
                                            .filter(sous_cat => sous_cat.categorieParent === newAnnonce.categorie)
                                            .map(sous_cat =>
                                                <option value={sous_cat.id} key={sous_cat.id}>{sous_cat.nom}</option>
                                            )
                                    }
                                </select>
                            </label>
                        }
                        <label>Description :
                            <textarea name="description" placeholder="Entrez la description" rows="15" cols="50" onChange={handleChange} />
                        </label>

                        <label>Date d'expiration :
                            <input type='date' name='dateExpiration' onChange={handleChange} />
                        </label>

                        <label>Choisissez le fichier image (JPEG ou PNG) :
                            <input type="file" name="image" accept="image/png, image/jpeg" onChange={handleChange} />
                            <span className='error'> Attention, l'image ne pourra pas être modifiée par la suite ! </span>
                        </label>

                        <label>
                            <input type="submit" value="Envoyer" disabled={loading} />
                        </label>

                    </form>
                </div >
                // :
                // <div>
                //     Vous devez vous connecter pour poublier un annonce!
                //     <Link to={'/inscription'}>S'inscrire</Link>
                //     <Link to={'/connexion'}>Se connecter</Link>
                // </div>
            }
        </div >
    )

}

