import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
// import { categories } from "./Categories"
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
        <> <style>
        @import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap');
        </style> 
        <h1 className="logo">Bons plans shopping</h1>
            <nav className="navbar">
            <ul>
                <li className="catMenu"><Link to={"/"}>Accueil</Link></li>
                <li className="catMenu"><Link to={"#"}>Catégories</Link>
                    <ul className="deroulant">
                        {categories &&
                            categories.map((item, index) => <li key={item.id}><Link to={`categorie=${item.nom}`}>{item.nom}</Link></li>
                            )}
                    </ul>
                </li>
                <li className="catMenu"><Link to={"/annonces/nouveau"}>Publier un bon plan</Link></li>
                <li className="catMenu"><Link to={"#"}>Mon compte</Link>
                    {user ?
                        <ul className="deroulant">
                            <li><Link to={"/compte/profil"}>Profil</Link></li>
                            <li><Link to={"/compte/favories"}>Favoris</Link></li>
                            <li onClick={() => { setUser(null); localStorage.removeItem('user') } }><Link to={"/"}>Se deconnecter</Link></li>
                        </ul>
                        :
                        <ul className="deroulant">
                            <li><Link to={"/inscription"}>S'inscrire</Link></li>
                            <li><Link to={"/connexion"}>Se connecter</Link></li>
                        </ul>}

                </li>
            </ul>
        </nav></>
    )
}

