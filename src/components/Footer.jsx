import { Link } from "react-router-dom"
import { Component } from "react"
import "./css/Footer.css"
//import "../dataBase/database.js"

class Footer extends Component {
    render() {
        return (
            <footer>
                    <div>Question ?</div>
                    <div className="footerMenu"><Link to={"/aPropos"}>A propos</Link></div>
                    <div>Mentions Légales</div>
            </footer>
        )
    }
}

export default Footer