import NavBar from "./NavBar";
import Footer from "./Footer";
import "./NavBar.css"
import "./Publier.css"
import { Component } from "react/cjs/react.production.min";
 
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
            image: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({[event.target.name] : event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let date = new Date();
        date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        this.setState({dateCreation: date});
        console.log(JSON.stringify(this.state));
    }

    // componentDidMount(){
    //     fetch('http://localhost:8000/read_categorie.php')
    //     .then(res=>res.json())
    //     .then(res=>thisUpdate)
    // }

    render() {
        return (<div>
            <NavBar />
            <div className="publication">
                <h3>Publier une nouvelle annonce :</h3>

                <form encType="multipart/form-data" method="POST" onSubmit={this.handleSubmit}>
                    
                    <label>Nom de l'annonce :  
                        <input type='text' name='titre' placeholder='Le titre' onChange={this.handleChange}/>
                    </label>

                    <label>Magasin :  
                        <input type="text" name="magasin" placeholder="Le magasin de l'annonce utilisateur" onChange={this.handleChange}/>
                    </label>

                    <label>Adresse de l'annonce :  
                        <input type='text' name='adresse' placeholder="adresse de l'annonce" onChange={this.handleChange}/>
                    </label>

                    <label>
                        Categorie de l'annonce :
                        <select name="categorie" id="categorie" onChange={this.handleChange}>
                            <option value="">Categorie</option>
                            <option value="sport">Sport</option>
                            <option value="sante">Santé</option>
                            <option value="beaute">Beauté</option>
                            <option value="menagere">Ménagère</option>
                            <option value="high_tech">High-Tech</option>
                            <option value="alimentaire">Alimentaire</option>
                            <option value="divertissement">Divertissement</option>
                        </select>
                    </label>

                    <label>
                        Sous categorie de l'annonce :
                        <select name="sous_categorie" id="sous_categorie" onChange={this.handleChange}>
                            <option value="">Sous Categorie</option>
                            <option value="jsp1">jsp1</option>
                            <option value="jsp2">jsp2</option>
                        </select>
                    </label>

                    <label>Description :  
                        <textarea name="description" placeholder="Entrez la description" rows="15" cols="50" onChange={this.handleChange}/>
                    </label>

                    <label>Date d'expiration :  
                        <input type='date' name='dateExpiration'  onChange={this.handleChange}/>
                    </label>

                    <label>Choisissez le fichier image (JPEG ou PNG) :
                        <input type="file" name="image" accept="image/png, image/jpeg" onChange={this.handleChange} />
                        <span className='error'> Attention, l'image ne pourra pas être modifiée par la suite ! </span>
                    </label>
                    {/* image obligatoire ??? */}

                    <label>
                        <input type="submit" value="Envoyer" />
                    </label>

                </form>
            </div>
            <Footer />
        </div>)
    }
}

export default Publier
