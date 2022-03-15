import "./css/NavBar.css"
import "./css/formulaire.css"
import { URLS } from "../dataBase/apiURLS";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { create_annonce, delete_annonce, get_annonce, get_categories, get_sous_categories, update_annonce } from "../dataBase/apiCalls";

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
        description: ''
    });

    const [categories, setCategories] = useState([]);
    const [sousCategories, setSousCategories] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();
    let params = useParams();

    const handleChange = (event) => {
        setAnnonce(a => ({ ...a, [event.target.name]: event.target.value }));
        if (event.target.name === 'categorie') {
            const newSousCategorie = sousCategories.find(cat => cat.categorieParent === event.target.value);
            setAnnonce(a => ({
                ...a,
                sous_categorie: newSousCategorie ? newSousCategorie.id : sousCategories[0].id
            }));
        }
    }

    const handleSubmit = async (event) => {
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

        let newAnnonce;
        try {
            newAnnonce = params.id ? await update_annonce(data) : await create_annonce(data);
            navigate(`/annonces/${newAnnonce}`)
        }
        catch (err) {
            setMessage(err);
        }
    }


    useEffect(async () => {
        if (params.id) {
            let fetched_annonce;
            try {
                fetched_annonce = await get_annonce(params.id);
                if (fetched_annonce) setAnnonce(fetched_annonce);
            }
            catch (err) {
                throw err;
            }
        }
        // fetch(`${URLS.annonce}?id=${params.id}`)
        //     .then(res => res.json())
        //     .then(res => {
        //         let bon_plan = {}
        //         for (let i in res) {
        //             bon_plan = { ...bon_plan, [i]: res[i] ? res[i] : '' }  // eviter les propriétés avec une valeur nulle
        //         }
        //         setAnnonce(bon_plan);
        //     });

        let cats;
        try {
            cats = await get_categories();
            setCategories(cats)
        } catch (err) {
            throw err;
        }


        let sous_cats;
        try {
            sous_cats = await get_sous_categories();
            setSousCategories(sous_cats);
        } catch (err) {
            throw err;
        }

        // fetch(URLS.categories)
        //     .then(res => res.json())
        //     .then(res => {
        //         let cats = []
        //         for (let i in res) {
        //             cats.push(res[i])
        //         }
        //         if (isMounted) {
        //             setCategories(cats)

        //             if (params.id) {
        //                 annonce && setAnnonce(a => ({ ...a, categorie: cats.find(cat => cat.categorie === a.categorie).id }));
        //             }
        //             else setAnnonce(a => ({ ...a, categorie: cats[0].id }));
        //         }
        //     });

        // fetch(URLS.sous_categories)
        //     .then(res => res.json())
        //     .then(res => {
        //         let cats = []
        //         for (let i in res) {
        //             cats.push(res[i])
        //         }
        //         if (isMounted) setSousCategories(cats)
        //         if (isMounted && sousCategories) {
        //             if (params.id)
        //                 annonce && setAnnonce(a => ({ ...a, sous_categorie: cats.find(cat => cat.nom === a.sous_categorie).id }));
        //             else setAnnonce(a => ({ ...a, sous_categorie: cats[0].id }));
        //         }
        //     });
    }, [params.id]);

    const [images, setImages] = useState([]);
    const [imagesURLs, setImagesURLs] = useState([]);

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
        setImagesURLs(newImageUrls);
    }, [images]);

    function onImageChange(event) {
        setAnnonce(a => ({ ...a, image: event.target.files[0].name }));
        setImages([...event.target.files]);
    }


    return (
        <div className="app">
            {
                // user ?
                <div className="formulaire">
                    <h3>Publier une nouvelle annonce :</h3>
                    {message && <div className="erreur">{message}</div>}
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
                                defaultValue={annonce.categorie.nom}
                            >
                                {
                                    categories &&
                                    categories.map(cat =>
                                        <option value={cat.id} key={cat.id}>{cat.nom}</option>
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
                                    defaultValue={annonce.sous_categorie.nom}
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
                            {/* <input type="file" name="image" multiple accept="image/*" onChange={handleChange} /> */}
                            <input type="file" name="image" multiple accept="image/*" onChange={onImageChange} />
                            {/* A enlever */}
                            {imagesURLs.map(imageSrc => <img key={imageSrc} src={imageSrc} />)}
                            <span className='error'> Attention, l'image ne pourra pas être modifiée par la suite ! </span>
                        </label>

                        <label>
                            <input id="submit" type="submit" value={params.id ? "Enregistrer" : "Créer"} disabled={loading} />
                        </label>

                    </form>
                </div >

                // :
                // <div style={{ display: 'grid' }}>
                //     Vous devez vous connecter pour pouvoir publier un annonce!
                //     <Link to={'/inscription'}>S'inscrire</Link>
                //     <Link to={'/connexion'}>Se connecter</Link>
                // </div>
            }
        </div >
    )

}