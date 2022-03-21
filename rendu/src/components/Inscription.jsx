import "./css/NavBar.css"
import "./css/formulaire.css"
import { URLS } from "../dataBase/apiURLS";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { create_utilisateur } from "../dataBase/apiCalls";

export default function Inscription() {
    const [newUtilisateur, setNewUtilisateur] = useState({
        pseudo: '',
        email: '',
        nom: '',
        prenom: '',
        mdp: '',
        confirmMDP: '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    let navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);


    const login = (userObject) => {
        const item = {
            value: userObject.id,
            expiry: new Date().getTime() + 600000,
        }

        localStorage.setItem('user', JSON.stringify(item))
        setUser(userObject)
        setLoading(false)
        navigate('/')
    }

    const handleChange = (event) => {
        setNewUtilisateur({ ...newUtilisateur, [event.target.name]: event.target.value });
    }

    const inscription = async (event) => {
        event.preventDefault();

        setLoading(true);

        let user;

        try {
            user = await create_utilisateur(newUtilisateur);
            if (user) login(user);
            setLoading(false);
        } catch (err) {
            setMessage('Un utilisateur avec cet adresse mail existe déjà')
            setLoading(false)
            throw Error('Un utilisateur avec cet adresse mail existe déjà');
        }

    }


    return (
        <div className="blocFormulaire">
            <div className="formulaire">
                <h3>S'inscrire :</h3>
                {message && <div className="erreur">{message}</div>}
                <form encType="multipart/form-data" method="POST" onSubmit={(e) => inscription(e)}>
                    <label>Pseudo :
                        <input type='text' name='pseudo' placeholder='Votre pseudo' onChange={handleChange} />
                    </label>

                    <label>Email :
                        <input type="text" name="email" placeholder="Votre email" onChange={handleChange} />
                    </label>

                    <label>Nom :
                        <input type='text' name='nom' placeholder='Votre nom' onChange={handleChange} />
                    </label>

                    <label>Prénom :
                        <input type='text' name='prenom' placeholder='Votre prénom' onChange={handleChange} />
                    </label>

                    <label>Mot de passe :
                        <input
                            type='password'
                            name='mdp'
                            placeholder="Minimum 4 caractères, 1 majuscule, 1 minuscule et 1 chiffre"
                            minLength="4"
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>Confirmer le mot de passe :
                        <input
                            type='password'
                            name='confirmMDP'
                            placeholder="Minimum 4 caractères, 1 majuscule, 1 minuscule et 1 chiffre"
                            minLength="4"
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
                            disabled={!newUtilisateur.pseudo || !newUtilisateur.email || newUtilisateur.mdp !== newUtilisateur.confirmMDP || loading}
                        />
                    </label>

                </form>
            </div>
        </div>
    )

}

