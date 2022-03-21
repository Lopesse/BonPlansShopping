<?php

include_once('Utilisateur.php');

class Utilisateur
{
    private $bd;

    public $pseudo;
    public $ID;
    public $email;
    public $mdp;

    public function __construct(PDO $bd)
    {
        $this->bd = $bd;
    }

    public function read($id)
    {
        $req = "SELECT * FROM utilisateur WHERE ID = :id";
        $stmt = $this->bd->prepare($req);
        $data = array(":id" => $id);
        $stmt->execute($data);
        $utilisateurArray = $stmt->fetch();
        $utilisateur = array();
        if ($utilisateurArray) {
            $utilisateur = array(
                'id' => $utilisateurArray['id'],
                'pseudo' => $utilisateurArray['pseudo'],
                'nom' => $utilisateurArray['nom'],
                'prenom' => $utilisateurArray['prenom'],
                'email' => $utilisateurArray['email'],
                'photo' => $utilisateurArray['photo'],
                'categoriesFav' => $this->getCategoriesFavories($utilisateurArray['id']),
                'annoncesEnregistres' => $this->getAnnoncesEnregistres($utilisateurArray['id']),
                'mdp' => $utilisateurArray['mdp'],
            );
        }
        return $utilisateur;
    }


    public function readAll()
    {
        $req = "SELECT * FROM utilisateur";
        $stmt = $this->bd->query($req);
        $queryArray = $stmt->fetchAll();

        $utilisateurArray = array();

        foreach ($queryArray as $key => $value) {
            $utilisateur = array(
                'pseudo' => $value['pseudo'],
                'id' => $value['id'],
                'email' => $value['email'],
                'photo' => $value['photo'],
                'nom' => $value['nom'],
                'prenom' => $value['prenom'],
                'categoriesFav' => $this->getCategoriesFavories($value['id']),
                'annoncesEnregistres' => $this->getAnnoncesEnregistres($value['id'])
            );
            $utilisateurArray[$value[$key]] = $utilisateur;
        }
        return $utilisateurArray;
    }

    public function getIdByPseudo($pseudo)
    {
        $req = "SELECT * FROM utilisateur WHERE pseudo = :pseudo";
        $stmt = $this->bd->prepare($req);
        $data = array(":pseudo" => $pseudo);
        $stmt->execute($data);
        $queryUtilisateur = $stmt->fetch();
        $utilisateurId = null;
        if ($queryUtilisateur) {
            $utilisateurId = $queryUtilisateur['id'];
        }
        return $utilisateurId;
    }


    public function create($data)
    {

        $req = "INSERT INTO utilisateur (pseudo, email, nom, prenom,  mdp)
                            VALUES (:pseudo, :email, :nom, :prenom, :MDP);";

        $stmt = $this->bd->prepare($req);

        $utilisateur_data = array(
            ':pseudo' => $data->pseudo,
            ':email' => $data->email,
            ':nom' => $data->nom,
            ':prenom' => $data->prenom,
            ':MDP' => password_hash($data->mdp, PASSWORD_BCRYPT)
        );
        try {
            $stmt->execute($utilisateur_data);
        } catch (PDOException $e) {
            return $e;
        }

        $id = $this->bd->lastInsertId();

        return $this->read($id);
    }

    public function connexion($data)
    {
        $req = "SELECT * FROM utilisateur WHERE email= :identifiant OR pseudo = :identifiant";
        $stmt = $this->bd->prepare($req);
        $queryData = array(':identifiant' => $data['identifiant']);
        $stmt->execute($queryData);
        $queryUtilisateur = $stmt->fetchAll();

        foreach ($queryUtilisateur as $key => $value) {
            if (password_verify($data['mdp'], $value['mdp'])) {
                $utilisateur = array(
                    'pseudo' => $value['pseudo'],
                    'id' => $value['id'],
                    'email' => $value['email'],
                    'photo' => $value['photo'],
                    'nom' => $value['nom'],
                    'prenom' => $value['prenom'],
                    'categoriesFav' => $this->getCategoriesFavories($value['id']),
                    'annoncesEnregistres' => $this->getAnnoncesEnregistres($value['id'])
                );
                return $utilisateur;
            }
        }
        return null;
    }

    public function deleteUser($data)
    {
        $req = "DELETE FROM utilisateur WHERE id= :id";
        $stmt = $this->bd->prepare($req);
        $queryData = array(":id" => $data['id']);
        $stmt->execute($queryData);
        $resultat = $stmt->fetch();

        return $resultat ? true : false;
    }

    public function updateUser($data)
    {
        $req = "UPDATE utilisateur
                SET nom= :nom, prenom= :prenom, pseudo= :pseudo, email= :email
                WHERE id= :id";

        $requete = $this->db->prepare($req);

        return $requete->execute(
            array(
                ":nom" => $data['nom'],
                ":prenom" => $data['prenom'],
                ":pseudo" => $data['pseudo'],
                ":email" => $data['email'],
                "id" => $data['id']
            )
        );
    }

    public function suivreCategorie($data)
    {
        $data->suivie ?
            $req = "DELETE FROM categories_favories WHERE utilisateur=:uid AND categorie=:cid;" :
            $req = "INSERT INTO categories_favories (utilisateur, categorie) VALUES (:uid, :cid);";
        $stmt = $this->bd->prepare($req);

        $queryData = array(
            ":uid" => $data->user_id,
            ":cid" => $data->categorie_id
        );

        $stmt->execute($queryData);
        $resultat = $stmt->fetch();
        return !$resultat;
    }

    public function enregistrerAnnonce($data)
    {
        $data->enregistrer ?
            $req = "INSERT INTO annonce_enregistre (utilisateur, annonce) VALUES (:uid, :aid);" :
            $req = "DELETE FROM annonce_enregistre WHERE utilisateur=:uid AND annonce=:aid;";
        $stmt = $this->bd->prepare($req);

        $queryData = array(
            ":uid" => $data->user_id,
            ":aid" => $data->annonce_id
        );

        $stmt->execute($queryData);
        $resultat = $stmt->fetch();

        return !$resultat;
    }

    public function getCategoriesFavories($id)
    {
        $req = "SELECT c.id, c.nom FROM categories_favories cf, categorie c WHERE cf.utilisateur = :uid AND c.id = cf.categorie;";
        $stmt = $this->bd->prepare($req);
        $queryData = array(":uid" => $id);
        $stmt->execute($queryData);
        $resultat = $stmt->fetchAll();
        $categorieArray = array();
        foreach ($resultat as $key => $value) {
            $categorie = array(
                'nom' => $value['nom'],
                'id' => $value['id'],
            );
            $categorieArray[$key] = $categorie;
        }
        return $categorieArray;
    }

    public function getAnnoncesEnregistres($id)
    {
        $req = "SELECT a.id
                FROM annonce_enregistre ae
                JOIN annonce a ON a.id = ae.annonce
                WHERE ae.utilisateur = :uid;";

        $stmt = $this->bd->prepare($req);
        $queryData = array(":uid" => $id);
        $stmt->execute($queryData);
        $resultat = $stmt->fetchAll();
        $annonceArray = array();
        foreach ($resultat as $key => $value) {
            $categorie = array(
                'id' => $value['id'],
            );
            $annonceArray[$key] = $categorie;
        }
        return $annonceArray;
    }
}
