import { Link } from "react-router-dom"
import { Component } from "react"
import "./css/Footer.css"
//import "../dataBase/database.js"

class Footer extends Component {
    render() {
        return (
            <footer>
                    <div>Question ?</div>
                    <div>À propos</div>
                    <div>Mentions Légales</div>
            </footer>
        )
    }
}

export default Footer