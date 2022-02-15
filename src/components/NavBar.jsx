import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
// import { categories } from "./Categories"
import "./css/NavBar.css"
import { UserContext } from "./UserContext"
import { URLS } from "../dataBase/apiURLS"

export default function NavBar() {

    const [categories, setCategories] = useState([]);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        let isMounted = true;
        //Recupération des données du fichier read_categorie.php
        fetch(URLS.categories, { cache: "force-cache" })
            //lecture de ce que le fetch a trouvé
            .then(res => res.json())
            .then(res => {
                let cats = [];
                for (let cat in res) {
                    cats.push(res[cat])
                }
                if (isMounted) setCategories(cats);
            })
    }, [])

    return (
        <nav className="navbar">
            <ul>
                <li><Link to={"/"}>Accueil</Link></li>
                <li><Link to={"#"} >Catégories</Link>
                    <ul className="deroulant">
                        {
                            categories &&
                            categories.map((item, index) =>
                                <li key={item.id}><Link to={`?categorie=${item.categorie}`}>{item.categorie}</Link></li>
                            )
                        }
                    </ul>
                </li>
                <li><Link to={"/annonces/nouveau"}>Publier une annonce</Link></li>
                <li><Link to={"#"}>Mon compte</Link>
                    {
                        user ?
                            <ul className="deroulant">
                                <li><Link to={"/compte/profil"}>Profil</Link></li>
                                <li><Link to={"/compte/favories"}>Favoris</Link></li>
                                <li onClick={() => { setUser(null); localStorage.removeItem('user'); }} style={{ cursor: "pointer", backgroundColor: "red" }}>Se deconnecter</li>
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


// export default function NavBar() {

//     const [categories, setCategorie] = useState([]);


//     useEffect(() => {
//         //Recupération des données du fichier read_categorie.php
//         fetch("http://localhost:8000/read_categorie.php")
//             //lecture de ce que le fetch a trouvé
//             .then(res => res.json())
//             .then(res => {
//                 for (let cat in res) {
//                     console.log(res[cat]);
//                     categories.push(res[cat])
//                     setCategorie([...categories])
//                 }
//             })
//     }, [])



//     return (
//         <div className="menu">
//             <nav className="menuHaut">
//                 <ul>
//                     <li><Link to={"/"}>Accueil</Link></li>
//                     <li><Link to={"#"}>Profil</Link></li>
//                     <li><Link to={"#"}>Compte</Link></li>
//                 </ul>
//             </nav>
//             <nav className="menuBas">
//                 <ul>
//                     <li><Link to={"#"} >Catégorie</Link>
//                         <ul className="deroulant">
//                             {
//                                 categories &&
//                                 categories.map((cat, index) =>
//                                     <li key={index}><Link to={"/"}>{cat.categorie}</Link></li>
//                                 )
//                             }
//                         </ul>
//                     </li>
//                     <li><Link to={"#"}>Favories</Link></li>
//                     <li><Link to={"/nouveau"}>Publier une annonce</Link></li>
//                 </ul>
//             </nav>
//         </div >
//     )
// }