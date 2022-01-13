import NavBar from "./NavBar";
import Footer from "./Footer";
import "./NavBar.css"
import "./Publier.css"

export default function Publier() {

    return (<div>
        <NavBar />
        <div className="publication">
            <h3>Publier une nouvelle annonce :</h3>

            <form enctype="multipart/form-data" action="index.php?action=sauverNouveau" method="POST">
                <label>Votre nom utilisateur :  <br />
                    <input type="text" name="utilisateur" placeholder="Nom utilisateur" value="" /><br />
                </label>

                <label>Nom de l'annonce :  <br />
                    <input type='text' name='titre' placeholder='Le titre' value='' /><br />
                </label>

                <label>Adresse/Lien de l'annonce :  <br />
                    <input type='text' name='adresse' placeholder='adresse ou lien' value='' /><br />
                </label>

                <label>Type de produit :  <br />
                    <input type="text" name="type" placeholder="Le type" value="" /><br />
                </label>

                <label>Description :  <br />
                    <textarea name="description" placeholder="Entrez la description" rows="15" cols="50" />
                </label><br />

                <label>Date de publication :  <br />
                    <input type='text' name='dateDeCreation' value='22-01-08 17:51:53' readonly='readonly' /><br />
                </label>

                <label>Date d'expiration :  <br />
                    <input type='date' name='dateExpiration' value='' /><br />
                </label>

                <label>Choisissez le fichier image (JPEG ou PNG) :
                    <input type="file" name="image" accept="image/png, image/jpeg" required />
                    <span class='error'> Attention, l'image ne pourra pas être modifiée par la suite ! </span>
                </label><br />

                <button>
                    Envoyer
                </button>
            </form>
        </div>
        <Footer />
    </div>)
}