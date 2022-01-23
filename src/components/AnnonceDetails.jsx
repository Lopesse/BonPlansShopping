import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';
import NavBar from './NavBar';
import { URLS } from '../dataBase/apiURLS';
import './annonces.css';
import UserProvider, { UserContext } from './UserContext';



export default function AnnonceDetails() {
    const params = useParams();

    const [annonce, setAnnonce] = useState();

    const { user } = useContext(UserContext);

    let navigate = useNavigate();

    useEffect(() => {
        fetch(`${URLS.annonce}?id=${params.id}`)
            .then(res => res.json())
            .then(res => setAnnonce(res));
    }, []);

    if (!annonce) navigate('/');

    const deletePost = () => {
        let isMounted = true;
        if (annonce) {
            fetch(URLS.delete_annonce, {
                method: "POST",
                body: JSON.stringify({ id: annonce.id }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (isMounted) setAnnonce(undefined);
        }
    }


    return (
        <>
            <NavBar />
            <div className='annonce'>
                {
                    annonce ?
                        <div className='annonce_infos'>
                            <h1>{annonce.titre}</h1>
                            {
                                annonce.image &&
                                <img src={annonce.image}></img>
                            }
                            <div>{annonce.description}</div>
                            <div>Disponible à {annonce.nom_magasin}</div>
                            <div>{annonce.adresse_magasin}</div>
                            <div>Expire le: {annonce.date_expiration}</div>
                            <div>Créé par: {annonce.utilisateur}</div>
                            <div className='categories'>
                                <div className='cat'>{annonce.sous_categorie}</div>
                                <div className='cat'>{annonce.categorie}</div>
                            </div>
                        </div>
                        :
                        <div>l'annonce n'a pas été trouvé</div>
                }
                {
                    user && annonce && user.pseudo === annonce.utilisateur &&
                    <Link to={`/edit/id=${annonce?.id}`}>Update</Link>
                }
                {
                    user && annonce && user.pseudo === annonce.utilisateur &&
                    < button onClick={deletePost}>supprimer anonce</button>
                }
            </div>
        </>
    );
}