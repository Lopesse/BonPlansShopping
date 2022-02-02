import "./NavBar.css"
import "./formulaire.css"
import { URLS } from "../dataBase/apiURLS";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Publier() {
    const { user, setUser } = useContext(UserContext);
    const [annonce, setAnnonce] = useState({
        titre: '',
        dateCreation: '',
        date_expiration: '',
        nom_magasin: '',
        adresse_magasin: '',
        categorie: '',
        sous_categorie: '',
        image: '',
        description: '',
        // categories: [],
        // sous_categories: []
    });

    const [categories, setCategories] = useState([]);
    const [sousCategories, setSousCategories] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();
    let params = useParams();

    const handleChange = (event) => {
        console.log(`${event.target.name} = ${event.target.value}`);
        setAnnonce(a => ({ ...a, [event.target.name]: event.target.value }));
        if (event.target.name === 'categorie') {
            setAnnonce(a => ({ ...a, sous_categorie: sousCategories.find(cat => cat.categorieParent === event.target.value).id }));
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        let date = new Date();
        date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        const data = {
            titre: annonce.titre,
            dateCreation: date,
            dateExpiration: annonce.date_expiration,
            nomMagasin: annonce.nom_magasin,
            adresseMagasin: annonce.adresse_magasin,
            categorie: annonce.categorie,
            sousCategorie: annonce.sous_categorie,
            image: annonce.image,
            utilisateur: user ? user.id : 1,
            description: annonce.description,
            id: params.id
        };

        console.log(data);

        let action = params.id ? URLS.update_annonce : URLS.creer_annonce;

        fetch(action, {
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
            .then(json => { setLoading(false); navigate(`/annonces/${JSON.parse(json)}`) })
            .catch(e => console.log(e));



    }

    useEffect(() => {
        let isMounted = true
        if (params.id)
            fetch(`${URLS.annonce}?id=${params.id}`)
                .then(res => res.json())
                .then(res => {
                    let bon_plan = {}
                    for (let i in res) {
                        bon_plan = { ...bon_plan, [i]: res[i] ? res[i] : '' }  // eviter les propriétés avec une valeur nulle
                    }
                    setAnnonce(bon_plan);
                });

        fetch(URLS.categories)
            .then(res => res.json())
            .then(res => {
                let cats = []
                for (let i in res) {
                    cats.push(res[i])
                }
                if (isMounted) {
                    setCategories(cats)

                    if (!params.id) {
                        setAnnonce(a => ({ ...a, categorie: cats[0].id }));
                    }
                    else {
                        setAnnonce(a => ({ ...a, categorie: cats.find(cat => cat.categorie === a.categorie).id }));
                    }
                }
            });

        fetch(URLS.sous_categories)
            .then(res => res.json())
            .then(res => {
                let cats = []
                for (let i in res) {
                    cats.push(res[i])
                }
                if (isMounted) setSousCategories(cats)
                if (isMounted)
                    !params.id ?
                        setAnnonce(a => ({ ...a, sous_categorie: cats.find(cat => cat.categorieParent === a.categorie).id })) :
                        setAnnonce(a => ({ ...a, sous_categorie: cats.find(cat => cat.nom === a.sous_categorie).id }))
            });
    }, [params.id])

    return (
        <div className="app">
            {
                user ?
                    <div className="formulaire">
                        <h3>Publier une nouvelle annonce :</h3>
                        {message && <div>{message}</div>}
                        <form encType="multipart/form-data" method="POST" onSubmit={handleSubmit}>

                            <label>Titre de l'annonce :
                                <input type='text' name='titre' placeholder='Le titre' onChange={handleChange} value={annonce.titre} />
                            </label>

                            <label>Magasin :
                                <input type="text" name="nom_magasin" placeholder="Le magasin de l'annonce utilisateur" onChange={handleChange} value={annonce.nom_magasin} />
                            </label>

                            <label>Adresse de l'annonce :
                                <input type='text' name='adresse_magasin' placeholder="adresse de l'annonce" onChange={handleChange} value={annonce.adresse_magasin} />
                            </label>

                            <label>
                                Categorie de l'annonce :
                                <select
                                    name="categorie"
                                    id="categorie"
                                    onChange={handleChange}
                                    defaultValue={annonce.categorie}
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
                                        defaultValue={annonce.sous_categorie}
                                    >
                                        {
                                            sousCategories &&
                                            sousCategories
                                                .filter(sous_cat => sous_cat.categorieParent === annonce.categorie)
                                                .map(sous_cat =>
                                                    <option value={sous_cat.id} key={sous_cat.id}>{sous_cat.nom}</option>
                                                )
                                        }
                                    </select>
                                </label>
                            }
                            <label>Description :
                                <textarea name="description" placeholder="Entrez la description" rows="13" cols="10" onChange={handleChange} value={annonce.description} />
                            </label>

                            <label>Date d'expiration :
                                <input type='date' name='date_expiration' onChange={handleChange} value={annonce.date_expiration} />
                            </label>

                            <label>Choisissez le fichier image (JPEG ou PNG) :
                                <input type="file" name="image" accept="image/png, image/jpeg" onChange={handleChange} value={annonce.image} />
                                <span className='error'> Attention, l'image ne pourra pas être modifiée par la suite ! </span>
                            </label>

                            <label>
                                <input id="submit" type="submit" value={params.id ? "Enregistrer" : "Créer"} disabled={loading} />
                            </label>

                        </form>
                    </div >

                    :
                    <div style={{ display: 'grid' }}>
                        Vous devez vous connecter pour pouvoir poublier un annonce!
                        <Link to={'/inscription'}>S'inscrire</Link>
                        <Link to={'/connexion'}>Se connecter</Link>
                    </div>
            }
        </div >
    )

}

