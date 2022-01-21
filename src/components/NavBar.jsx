import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Component } from "react"
import { categories } from "./Categories"
import "./NavBar.css"
//import "../dataBase/database.js"

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar">
                <ul>
                    <li><Link to={"/"}>Accueil</Link></li>
                    <li><Link to={"#"} >Catégories</Link>
                        <ul className="deroulant">
                            {categories.map((item, index) => {
                                return (
                                    <li key={index}><Link to={item.url}>{item.nom}</Link></li>
                                )
                            })}
                        </ul>
                    </li>
                    <li><Link to={"/nouveau"}>Publier une annonce</Link></li>
                    <li><Link to={"#"}>Mon compte</Link>
                        <ul className="deroulant">
                            <li><Link to={"/profil"}>Profil</Link></li>
                            <li><Link to={"#"}>Favoris</Link></li>
                            <li><Link to={"/inscription"}>S'inscrire</Link></li>
                            <li><Link to={"/connexion"}>Se connecter</Link></li>
                        </ul>

                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar
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
//                     <li><Link to={"#"}>Profil</a></li>
//                     <li><Link to={"#"}>Compte</a></li>
//                 </ul>
//             </nav>
//             <nav className="menuBas">
//                 <ul>
//                     <li><Link to={"#"} >Catégorie</a>
//                         <ul className="deroulant">
//                             {
//                                 categories &&
//                                 categories.map((cat, index) =>
//                                     <li key={index}><Link to={"/"}>{cat.categorie}</Link></li>
//                                 )
//                             }
//                         </ul>
//                     </li>
//                     <li><Link to={"#"}>Favories</a></li>
//                     <li><Link to={"/nouveau"}>Publier une annonce</Link></li>
//                 </ul>
//             </nav>
//         </div >
//     )
// }