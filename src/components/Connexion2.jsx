import NavBar from "./NavBar";
import Footer from "./Footer";
import "./NavBar.css"
import "./Connexion.css"
import { URLS } from "../dataBase/apiURLS";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export default function Connexion2() {

    const [identifiants, setIdentifiants] = useState({ login: '', mdp: '' });

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState('');

    const { user, setUser } = useContext(UserContext);


    let navigate = useNavigate();

    const login = (userObject) => {
        if (userObject == -1) setMessage('Identifiants erronnés');
        else {
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
        setIdentifiants({ ...identifiants, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setLoading(true);

        fetch(`${URLS.connexion}?identifiant=${identifiants.login}&mdp=${identifiants.mdp}`)
            .then(res => res.json())
            .then(json => login(json))
            .catch(e => console.log(e));
    }

    return (
        <div>
            <NavBar />
            <div className="connexion">
                <h3>Se connecter :</h3>
                {
                    message &&
                    <div>{message}</div>
                }
                <form encType="multipart/form-data" method="POST" onSubmit={handleSubmit}>

                    <label>Pseudo ou email:
                        <input type='text' name='login' placeholder='Votre pseudo ou votre email' onChange={handleChange} />
                    </label>

                    <label>Mot de passe :
                        <input type="password" name="mdp" placeholder="Votre mot de passe" onChange={handleChange} />
                    </label>

                    <label>
                        <input type="submit" value="Se connecter" disabled={loading} />
                    </label>

                </form>
            </div>
            <Footer />
        </div>
    )
}


