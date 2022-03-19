import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';
import './css/annonces.css';
import UserProvider, { UserContext } from './UserContext';
import CategorieTag from './CategorieTag';
import { delete_annonce, enregistrer_annonce, get_annonce, get_utilisateur } from '../dataBase/apiCalls';
import blackheart from './images/black-heart.png';
import redheart from './images/red-heart.png';
// import upload from '../upload/6235add9b121ftalaref.png';


export default function AnnonceDetails() {
    const [annonce, setAnnonce] = useState();
    const [tempsRestant, setTempsRestant] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const { user, setUser } = useContext(UserContext);


    let navigate = useNavigate();
    let params = useParams()
    useEffect(async () => {
        let fetched_annonce;
        try {
            fetched_annonce = await get_annonce(params.id);
            setAnnonce(fetched_annonce);
            setTempsRestant(new Date(new Date(fetched_annonce.date_expiration) - Date.now()).getTime() / 3600000);
            setIsLoaded(true);
        }
        catch (err) {
            console.log(err);
        }


    }, []);

    const deletePost = async () => {
        let deleted;
        try {
            setIsLoaded(false);
            deleted = await delete_annonce(annonce.id);

            if (deleted) {
                setAnnonce(null);
                navigate('/');
                setIsLoaded(true);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const enregistrerAnnonce = async (enregistrer) => {
        console.log(enregistrer)
        let enregistre;
        const data = {
            user_id: user.id,
            annonce_id: annonce.id,
            enregistrer: enregistrer
        }

        try {
            enregistre = await enregistrer_annonce(data)
            if (enregistre) {
                let updatedUser;
                try {
                    updatedUser = await get_utilisateur(user.id);
                    if (updatedUser) setUser(updatedUser);
                }
                catch (err) {
                    throw err;
                }
            }
        }
        catch (err) {
            throw err;
        }
    }

    return (
        <>
            <div className='publierAnnonce'>
                {
                    !isLoaded ?
                        <div>Chargement en cours…</div>
                        :
                        annonce ?
                            <div>
                                <h1 style={{ textAlign: 'center', marginBottom: 20 }}>{annonce.titre}</h1>
                                <img
                                    src={user && user.annoncesEnregistres && !user.annoncesEnregistres.find(a => a.id === annonce.id) ? blackheart : redheart}
                                    onClick={() => enregistrerAnnonce(user && user.annoncesEnregistres && !user.annoncesEnregistres.find(a => a.id === annonce.id))}
                                />
                                <div className='annonce'>
                                {   
                                    annonce.image ?
                                        <img className="img" src={require('../../api/upload/' + annonce.image)} alt="img" />
                                    :
                                    <img className="img" src={require('./images/noImage.png')} alt="img" />
                                }
                                    <div className='InfosAnnonce'>
                                        <div style={{ fontSize: 'smaller' }}>Créé par : {annonce.utilisateur}</div>
                                        <div>Disponible à {annonce.nom_magasin}</div>
                                        <div>Adrdesse ou Lien du magasin : {annonce.adresse_magasin}</div>
                                        <div>Expire le : {annonce.date_expiration}</div>
                                        <div>{annonce.description}</div>
                                        <div style={{ marginTop: 20 }}>
                                            <CategorieTag categorie={annonce.categorie} />
                                            <div className='cat'>{annonce.sous_categorie.nom}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>l'annonce n'a pas été trouvé</div>
                }
                {
                    user && annonce && user.pseudo === annonce.utilisateur &&
                    <Link to={`/annonces/edit/${annonce?.id}`} style={{marginRight: 10}}>Modifier l'annonce</Link>
                }
                {
                    user && annonce && user.pseudo === annonce.utilisateur &&
                    <Link to={`#`} onClick={deletePost} style={{marginLeft: 10}}>Supprimer l'annonce</Link>
                    // < button onClick={deletePost}>supprimer anonce</button>
                }
            </div>
        </>
    );
}