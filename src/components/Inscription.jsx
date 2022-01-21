import NavBar from "./NavBar";
import Footer from "./Footer";
import "./NavBar.css"
import "./Inscription.css"
import { Component } from "react/cjs/react.production.min";
import { URLS } from "../dataBase/apiURLS";

class Inscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pseudo: '',
            email: '',
            // photo: '',
            // categoriesFav: '',*/
            MDP: '',
            confirmMDP: '',
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const data = {
            pseudo: this.state.pseudo,
            email: this.state.email,
            mdp: this.state.MDP
        }


        this.setState({ loading: true });

        fetch(URLS.inscription, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                this.setState({ loading: false })
            })
            .catch(e => console.log(e));

    }

    render() {
        return (<div>
            <NavBar />
            <div className="inscription">
                <h3>S'inscrire :</h3>
                <form encType="multipart/form-data" method="POST" onSubmit={(e) => this.handleSubmit(e)}>
                    <label>Pseudo :
                        <input type='text' name='pseudo' placeholder='Votre pseudo' onChange={this.handleChange} />
                    </label>

                    <label>Email :
                        <input type="text" name="email" placeholder="Votre email" onChange={this.handleChange} />
                    </label>

                    {/* <label>Photo de profil (JPEG ou PNG) :
                        <input type="file" name="photo" accept="image/png, image/jpeg" onChange={this.handleChange} />
                    </label> */}

                    <label>Mot de passe :
                        <input
                            type='password'
                            name='MDP'
                            placeholder="Minimum 8 caractères, 1 majuscule, 1 minuscule et 1 chiffre"
                            // pattern="[A-Z]+[a-z]+[0-9]+"
                            minLength="8"
                            onChange={this.handleChange}
                            required
                        />
                    </label>

                    <label>Confirmer le mot de passe :
                        <input
                            type='password'
                            name='confirmMDP'
                            placeholder="Minimum 8 caractères, 1 majuscule, 1 minuscule et 1 chiffre"
                            // pattern="[A-Z]+[a-z]+[0-9]+"
                            minLength="8"
                            onChange={this.handleChange}
                            required
                        />
                        {
                            this.state.confirmMDP && this.state.MDP !== this.state.confirmMDP &&
                            <div>Les mots de passe ne sont pas égaux!</div>
                        }
                    </label>
                    <label>
                        <input type="submit" value="S'inscrire" disabled={!this.state.pseudo || !this.state.email || this.state.MDP !== this.state.confirmMDP || !this.state.loading} />
                    </label>

                </form>
            </div>
            <Footer />
        </div>)
    }
}

export default Inscription
