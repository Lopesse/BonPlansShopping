import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';
import { URLS } from '../dataBase/apiURLS';
import './css/annonces.css';
import UserProvider, { UserContext } from './UserContext';
import CategorieTag from './CategorieTag';
import { delete_annonce, get_annonce } from '../dataBase/apiCalls';



export default function AnnonceDetails() {
    const [annonce, setAnnonce] = useState();
    const [tempsRestant, setTempsRestant] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const { user } = useContext(UserContext);


    let navigate = useNavigate();
    let params = useParams();

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
            }
        }
        catch (err) {
            console.log(err);
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
                                <div className='annonce'>
                                    {
                                        annonce.image &&
                                        <img src={`./api/upload/${annonce.image}`}></img>
                                    }
                                    <div className='InfosAnnonce'>
                                        <div style={{ fontSize: 'smaller' }}>Créé par : {annonce.utilisateur}</div>
                                        <div>Disponible à {annonce.nom_magasin}</div>
                                        <div>Adrdesse ou Lien du magasin : {annonce.adresse_magasin}</div>
                                        <div>Expire le : {annonce.date_expiration}</div>
                                        {
                                            tempsRestant < 24 &&
                                            <div style={{ color: 'red' }}>Expire dans {tempsRestant} heures !</div>
                                        }
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
                    <Link to={`/annonces/edit/${annonce?.id}`}>Update</Link>
                }
                {
                    user && annonce && user.pseudo === annonce.utilisateur &&
                    < button onClick={deletePost}>supprimer anonce</button>
                }
            </div>
        </>
    );
}