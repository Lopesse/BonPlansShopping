import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./css/NavBar.css"
import { UserContext } from "./UserContext"
import { get_categories } from "../dataBase/apiCalls"

export default function NavBar() {

    const [categories, setCategories] = useState([]);
    const { user, setUser } = useContext(UserContext);

    useEffect(async () => {
        let cats;
        try {
            cats = await get_categories();
            setCategories(cats)
        } catch (err) {
            throw err;
        }
    }, [])

    return (
        <nav className="navbar">
            <Link to={"/"}><img src={require("./images/logobps.png")} style={{ maxWidth: 250 }} onMouseOver={e => (e.currentTarget.src = require("./images/logobpsHover.png"))} onMouseOut={e => (e.currentTarget.src = require("./images/logobps.png"))} /></Link>
            <ul style={{gridTemplateColumns: user ? '1fr 1fr 1fr' :'1fr 1fr'}}>
                <li><Link to={"#"} >Catégories</Link>
                    <ul className="deroulant" style={{width: user ? 290 : '33%' }}>
                        {categories &&
                            categories.map((item, index) => <li key={item.id}><Link to={`categorie=${item.nom}`}>{item.nom}</Link></li>
                            )}
                    </ul>
                </li>
                {
                    user &&
                        <li><Link to={"/annonces/nouveau"}>Publier une annonce</Link></li>
                }
                <li><Link to={"#"}>Mon compte</Link>
                    {
                        user ?
                            <ul className="deroulant" style={{width: user ? 290 : '33%' }}>
                                <li><Link to={"/compte/profil"}>Profil</Link></li>
                                <li><Link to={"/compte/favories"}>Abonnement(s)</Link></li>
                                <li><Link to={"/compte/annonces-enregistres"}>Annonces enregistrés</Link></li>
                                <li onClick={() => { setUser(null); localStorage.removeItem('user'); }}><Link to={"/"}>Se deconnecter</Link></li>
                            </ul>
                            :
                            <ul className="deroulant" style={{width: user ? 290 : '33%' }}>
                                <li><Link to={"/inscription"}>S'inscrire</Link></li>
                                <li><Link to={"/connexion"}>Se connecter</Link></li>
                            </ul>
                    }
                </li>
            </ul>
        </nav >
    )
}

