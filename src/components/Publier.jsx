import NavBar from "./NavBar";
import Footer from "./Footer";
import "./NavBar.css"
import "./Publier.css"
import { Component } from "react/cjs/react.production.min";
import { URLS } from "../dataBase/apiURLS";

class Publier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titre: '',
            dateCreation: '',
            dateExpiration: '',
            iDUtilisateur: '',
            magasin: '',
            adresse: '',
            categorie: '',
            sous_categorie: '',
            image: '',
            description: '',
            categories: [],
            sous_categories: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        let date = new Date();
        date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

        const data = {
            titre: this.state.titre,
            dateCreation: date,
            dateExpiration: this.state.dateExpiration,
            nomMagasin: this.state.magasin,
            adresseMagasin: this.state.adresse,
            categorie: this.state.categorie,
            sousCategorie: this.state.sous_categorie,
            image: this.state.image,
            utilisateur: 1, // à changer une fois que la connexion est mise en place
            description: this.state.description
        };

        fetch(URLS.creer_annonce, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(e => console.log(e));
    }

    componentDidMount() {
        fetch(URLS.categories)
            .then(res => res.json())
            .then(res => {
                let cats = []
                for (let i in res) {
                    cats.push(res[i])
                }
                this.setState({ categories: cats })
                this.setState({ categorie: cats[0].id })
            });

        fetch(URLS.sous_categories)
            .then(res => res.json())
            .then(res => {
                let cats = []
                for (let i in res) {
                    cats.push(res[i])
                }
                this.setState({ sous_categories: cats })
                this.setState({ sous_categorie: cats[0].id })
            });
    }

    render() {
        return (<div>
            <NavBar />
            <div className="publication">
                <h3>Publier une nouvelle annonce :</h3>

                <form encType="multipart/form-data" method="POST" onSubmit={this.handleSubmit}>

                    <label>Nom de l'annonce :
                        <input type='text' name='titre' placeholder='Le titre' onChange={this.handleChange} />
                    </label>

                    <label>Magasin :
                        <input type="text" name="magasin" placeholder="Le magasin de l'annonce utilisateur" onChange={this.handleChange} />
                    </label>

                    <label>Adresse de l'annonce :
                        <input type='text' name='adresse' placeholder="adresse de l'annonce" onChange={this.handleChange} />
                    </label>

                    <label>
                        Categorie de l'annonce :
                        <select
                            name="categorie"
                            id="categorie"
                            onChange={this.handleChange}
                            defaultValue={this.state.categories[0]}
                        >
                            {
                                this.state.categories &&
                                this.state.categories.map(cat =>
                                    <option value={cat.id} key={cat.id}>{cat.categorie}</option>
                                )
                            }
                        </select>
                    </label>
                    {
                        this.state.sous_categories &&
                        <label>
                            Sous categorie de l'annonce :
                            <select
                                name="sous_categorie"
                                id="sous_categorie"
                                onChange={this.handleChange}
                                defaultValue={this.state.sous_categorie}
                            >
                                {
                                    this.state.sous_categories
                                        .filter(sous_cat => sous_cat.categorieParent === this.state.categorie)
                                        .map(sous_cat =>
                                            <option value={sous_cat.id} key={sous_cat.id}>{sous_cat.nom}</option>
                                        )

                                }
                            </select>
                        </label>

                    }
                    <label>Description :
                        <textarea name="description" placeholder="Entrez la description" rows="15" cols="50" onChange={this.handleChange} />
                    </label>

                    <label>Date d'expiration :
                        <input type='date' name='dateExpiration' onChange={this.handleChange} />
                    </label>

                    <label>Choisissez le fichier image (JPEG ou PNG) :
                        <input type="file" name="image" accept="image/png, image/jpeg" onChange={this.handleChange} />
                        <span className='error'> Attention, l'image ne pourra pas être modifiée par la suite ! </span>
                    </label>

                    <label>
                        <input type="submit" value="Envoyer" />
                    </label>

                </form>
            </div >
            <Footer />
        </div >)
    }
}

export default Publier
