import NavBar from "./NavBar";
import Footer from "./Footer";
import "./NavBar.css"
import "./Inscription.css"
import { Component } from "react/cjs/react.production.min";
import { URLS } from "../dataBase/apiURLS";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export default function Inscription2() {
    const [newUtilisateur, setNewUtilisateur] = useState({
        pseudo: '',
        email: '',
        nom: '',
        prenom: '',
        mdp: '',
        confirmMDP: '',
    });

    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    const { user, setUser } = useContext(UserContext);


    const login = (userObject) => {
        if (userObject != -1) {
            const item = {
                value: userObject.id,
                expiry: new Date().getTime() + 600000,
            }

            localStorage.setItem('user', JSON.stringify(item))
            setUser(userObject)
            setLoading(false)
            navigate('/')
        }
    }

    const handleChange = (event) => {
        setNewUtilisateur({ ...newUtilisateur, [event.target.name]: event.target.value });
        console.log(newUtilisateur)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setLoading(true);

        console.log(newUtilisateur)
        fetch(URLS.inscription, {
            method: "POST",
            body: JSON.stringify(newUtilisateur),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(json => login(json))
            .catch(e => console.log(e));

    }


    return (
        <div>
            <NavBar />
            <div className="inscription">
                <h3>S'inscrire :</h3>
                <form encType="multipart/form-data" method="POST" onSubmit={(e) => handleSubmit(e)}>
                    <label>Pseudo :
                        <input type='text' name='pseudo' placeholder='Votre pseudo' onChange={handleChange} />
                    </label>

                    <label>Email :
                        <input type="text" name="email" placeholder="Votre email" onChange={handleChange} />
                    </label>

                    <label>Nom :
                        <input type='text' name='nom' placeholder='Votre nom' onChange={handleChange} />
                    </label>

                    <label>Prenom :
                        <input type='text' name='prenom' placeholder='Votre prenom' onChange={handleChange} />
                    </label>

                    <label>Mot de passe :
                        <input
                            type='password'
                            name='mdp'
                            placeholder="Minimum 8 caractères, 1 majuscule, 1 minuscule et 1 chiffre"
                            // pattern="[A-Z]+[a-z]+[0-9]+"
                            minLength="8"
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>Confirmer le mot de passe :
                        <input
                            type='password'
                            name='confirmMDP'
                            placeholder="Minimum 8 caractères, 1 majuscule, 1 minuscule et 1 chiffre"
                            // pattern="[A-Z]+[a-z]+[0-9]+"
                            minLength="8"
                            onChange={handleChange}
                            required
                        />
                        {
                            newUtilisateur.confirmMDP && newUtilisateur.mdp !== newUtilisateur.confirmMDP &&
                            <div>Les mots de passe ne sont pas égaux!</div>
                        }
                    </label>
                    <label>
                        <input
                            type="submit"
                            value="S'inscrire"
                            disabled={!newUtilisateur.pseudo || !newUtilisateur.email || newUtilisateur.mdp !== newUtilisateur.confirmMDP || newUtilisateur.loading}
                        />
                    </label>

                </form>
            </div>
            <Footer />
        </div>
    )

}

