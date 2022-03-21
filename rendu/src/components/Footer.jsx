import { Link } from "react-router-dom"
import { Component } from "react"
import "./css/Footer.css"
//import "../dataBase/database.js"

class Footer extends Component {
    render() {
        return (
            <footer>
                    <Link to={"#"} >Question ?</Link>
                    <Link to={"/aPropos"} className="footerMenu">A propos</Link>
                    <Link to={"#"}>Mentions Légales</Link>
            </footer>
        )
    }
}

export default Footer