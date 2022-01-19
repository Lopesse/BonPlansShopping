import React, { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';
import NavBar from './NavBar';
import Annonce from './Annonce';
import { URLS } from '../dataBase/apiURLS';



export default function AnnonceDetails() {
    const params = useParams();

    const [annonce, setAnnonce] = useState();
    let navigate = useNavigate();

    // useEffect(() => {
    //     fetch(`${URLS.annonce}?id=${params.id}`)
    //         .then(res => res.json())
    //         .then(res => setAnnonce(res));
    // }, []);

    if (!annonce) navigate('/');

    const deletePost = () => {
        if (annonce) {
            fetch('http://localhost:8000/api/delete_post.php', {
                method: "DELETE",
                body: JSON.stringify({ post_id: annonce.post_id }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setAnnonce(undefined);
        }
    }


    return (
        <>
            <NavBar />
            <div className='plan'>
                {
                    annonce &&
                    <Annonce
                        annonce={annonce}
                    />
                }
                <Link to={`/edit/id=${annonce?.post_id}`}>Update</Link>
                <button onClick={deletePost}>supprimer anonce</button>
            </div>
        </>
    );
}