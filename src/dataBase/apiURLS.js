
const API_ADRESS = 'http://localhost';

const PORT = '8000';

export const URLS = {
    annonces: `${API_ADRESS}:${PORT}/liste_annonce.php`,
    categories: `${API_ADRESS}:${PORT}/liste_categorie.php`,
    creer_annonce: `${API_ADRESS}:${PORT}/creer_annonce.php`,
    update_annonce: `${API_ADRESS}:${PORT}/update_annonce.php`,
    annonce: `${API_ADRESS}:${PORT}/annonce.php`,
    sous_categories: `${API_ADRESS}:${PORT}/liste_sous_categorie.php`,
    delete_annonce: `${API_ADRESS}:${PORT}/delete_annonce.php`,
    inscription: `${API_ADRESS}:${PORT}/create_utilisateur.php`,
    connexion: `${API_ADRESS}:${PORT}/connexion.php`,
    get_utilisateur: `${API_ADRESS}:${PORT}/get_utilisateur.php`,
    delete_utilisateur: `${API_ADRESS}:${PORT}/delete_utilisateur.php`,
    suivre_categorie: `${API_ADRESS}:${PORT}/suivre_categorie.php`,
    suivre_categorie: `${API_ADRESS}:${PORT}/suivre_categorie.php`,
    update_utilisateur: `${API_ADRESS}:${PORT}/update_utilisateur.php`,
    enregistrer_annonce: `${API_ADRESS}:${PORT}/enregistrer_annonce.php`,
    get_annonces_enregistres: `${API_ADRESS}:${PORT}/get_annonces_enregistres.php`,
}
