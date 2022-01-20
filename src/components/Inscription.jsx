import NavBar from "./NavBar";
import Footer from "./Footer";
import "./NavBar.css"
import "./Inscription.css"
import { Component } from "react/cjs/react.production.min";
 
class Inscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pseudo: '',
            email: '',
            /*photo: '',
            categoriesFav: '',*/
            MDP: ''
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
            <div className="inscription">
                <h3>S'inscrire :</h3>

                <form encType="multipart/form-data" method="POST" onSubmit={this.handleSubmit}>
                    
                    <label>Pseudo :  
                        <input type='text' name='pseudo' placeholder='Votre pseudo' onChange={this.handleChange}/>
                    </label>

                    <label>Email :  
                        <input type="text" name="email" placeholder="Votre email" onChange={this.handleChange}/>
                    </label>

                    {/*<label>Photo de profil (JPEG ou PNG) :
                        <input type="file" name="photo" accept="image/png, image/jpeg" onChange={this.handleChange} />
                        <span className='error'> Attention, l'image ne pourra pas être modifiée par la suite ! </span>
                    </label>*/}

                    <label>Mot de passe :  
                        <input type='text' name='MDP' placeholder="Minimum 6 caractères, 1 majuscule, 1 minuscule et 1 chiffre" onChange={this.handleChange}/>
                    </label>
                    
                    <label>
                        <input type="submit" value="S'inscrire" />
                    </label>

                </form>
            </div>
            <Footer />
        </div>)
    }
}

export default Inscription
