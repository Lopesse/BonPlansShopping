import { Link } from "react-router-dom"
import { Component } from "react"
import "./Footer.css"
//import "../dataBase/database.js"

class Footer extends Component {
    render() {
        return (
            <footer>
                <ul>
                    <li>Question ?</li>
                    <li>À propos</li>
                    <li>Mentions Légales</li>
                </ul>
            </footer>
        )
    }
}

export default Footer