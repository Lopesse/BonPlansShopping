import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';
import { URLS } from '../dataBase/apiURLS';
import './css/annonces.css';
import UserProvider, { UserContext } from './UserContext';
import CategorieTag from './CategorieTag';



export default function AnnonceDetails() {
    const [annonce, setAnnonce] = useState();
    const [isLoaded, setIsLoaded] = useState(true);
    const { user } = useContext(UserContext);
    const params = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`${URLS.annonce}?id=${params.id}`)
            .then(res => res.json())
            .then(res => { 
                console.log(res); 
                setAnnonce(res);
                setIsLoaded(false);
            });
    }, []);

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
            if (isMounted) setAnnonce(null);
            navigate('/');
        }
    }

    return (
        <>
            <div className='publierAnnonce'>
                {
                    isLoaded ?
                        <div>Chargement en cours…</div>
                    :
                    annonce ?
                        <div>
                            <h1 style={{textAlign: 'center', marginBottom: 20}}>{annonce.titre}</h1>
                            <div className='annonce'>                                
                                    {
                                        annonce.image &&
                                        <img src={`./api/upload/${annonce.image}`}></img>
                                    }
                                <div className='InfosAnnonce'>
                                    <div style={{fontSize: 'smaller' }}>Créé par : {annonce.utilisateur}</div>
                                    <div>Disponible à {annonce.nom_magasin}</div>
                                    <div>Adrdesse ou Lien du magasin : {annonce.adresse_magasin}</div>
                                    <div>Expire le : {annonce.date_expiration}</div>
                                    <div>{annonce.description}</div>
                                    <div style={{marginTop: 20}}>
                                        <CategorieTag categorie={annonce.categorie} />
                                        <div className='cat'>{annonce.sous_categorie['nom']}</div>
                                        {/* On ne peut pas s'abonner à une sous catégorie pour l'instant donc on va plutôt le mettre sans le + - */}
                                        {/* <CategorieTag categorie={annonce.sous_categorie} /> */}
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