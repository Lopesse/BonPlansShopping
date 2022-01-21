import NavBar from "./NavBar";
import Footer from "./Footer";
import "./NavBar.css"
import "./Connexion.css"
import { Component } from "react/cjs/react.production.min";
import { URLS } from "../dataBase/apiURLS";

class Connexion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            identifiant: '',
            MDP: '',
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
        this.setState({ loading: true });
        fetch(URLS.connexion)
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
            <div className="connexion">
                <h3>Se connecter :</h3>

                <form encType="multipart/form-data" method="POST" onSubmit={this.handleSubmit}>

                    <label>Pseudo ou email:
                        <input type='text' name='identifiant' placeholder='Votre pseudo ou votre email' onChange={this.handleChange} />
                    </label>

                    <label>Mot de passe :
                        <input type="text" name="MDP" placeholder="Votre mot de passe" onChange={this.handleChange} />
                    </label>

                    <label>
                        <input type="submit" value="Se connecter" disabled={!this.state.loading} />
                    </label>

                </form>
            </div>
            <Footer />
        </div>)
    }
}

export default Connexion
