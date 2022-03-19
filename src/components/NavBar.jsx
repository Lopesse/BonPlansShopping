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
        <nav className="navbar">
            <ul style={{
                display : 'grid', 
                gridTemplateColumns: user ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr', 
                textAlign: 'center'
            }}>
                <li><Link to={"/"}>Accueil</Link></li>
                <li><Link to={"#"} >Catégories</Link>
                    <ul className="deroulant">
                        {
                            categories &&
                            categories.map((item, index) =>
                                <li key={item.id}><Link to={`categorie=${item.nom}`}>{item.nom}</Link></li>
                            )
                        }
                    </ul>
                </li>
                {
                    user &&
                        <li><Link to={"/annonces/nouveau"}>Publier une annonce</Link></li>
                }
                <li><Link to={"#"}>Mon compte</Link>
                    {
                        user ?
                            <ul className="deroulant">
                                <li><Link to={"/compte/profil"}>Profil</Link></li>
                                <li><Link to={"/compte/favories"}>Favoris</Link></li>
                                <li><Link to={"/compte/annonces-enregistres"}>Annonces enregistrés</Link></li>
                                <li onClick={() => { setUser(null); localStorage.removeItem('user'); }}><Link to={"/"}>Se deconnecter</Link></li>
                            </ul>
                            :
                            <ul className="deroulant">
                                <li><Link to={"/inscription"}>S'inscrire</Link></li>
                                <li><Link to={"/connexion"}>Se connecter</Link></li>
                            </ul>
                    }

                </li>
            </ul>
        </nav>
    )
}

