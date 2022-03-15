import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';
import NavBar from './NavBar';
import { URLS } from '../dataBase/apiURLS';
import './css/annonces.css';
import UserProvider, { UserContext } from './UserContext';
import CategorieTag from './CategorieTag';



export default function AnnonceDetails() {
    const params = useParams();
    const [annonce, setAnnonce] = useState();
    const [tempsRestant, setTempsRestant] = useState(0);
    const { user } = useContext(UserContext);


    let navigate = useNavigate();

    useEffect(() => {
        fetch(`${URLS.annonce}?id=${params.id}`)
            .then(res => res.json())
            .then(res => {
                setAnnonce(res);
                let now = Date.now();
                let dateExp = new Date(res.date_expiration).getTime();
                setTempsRestant(new Date(dateExp - now).getHours());
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
                    annonce ?
                        <div className='InfosAnnonce'>
                            <h1>{annonce.titre}</h1>
                            {
                                annonce.image &&
                                <img src={`./api/upload/${annonce.image}`}></img>
                            }
                            <div>{annonce.description}</div>
                            <div>Disponible à {annonce.nom_magasin}</div>
                            <div>{annonce.adresse_magasin}</div>
                            <div>Expire le: {annonce.date_expiration}</div>
                            {
                                tempsRestant < 24 &&
                                <div style={{ color: 'red' }}>Expire dans {tempsRestant} heures</div>
                            }
                            <div>Créé par: {annonce.utilisateur}</div>
                            <div className='categories'>
                                <CategorieTag categorie={annonce.categorie} />
                                <div>{annonce.sous_categorie.nom} </div>
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