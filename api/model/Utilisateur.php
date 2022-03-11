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
                'categoriesFav' => $utilisateurArray['categoriesFav'],
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
                'CategoriesFav' => $value['categoriesFav'],
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
                    'categoriesFav' => $this->getCategoriesFavories($value['id'])
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
        return $resultat;
    }

    public function suivreCategorie($data)
    {
        $req = "INSERT INTO categories_favories (utilisateur, categorie) VALUES (:utid, :cid)";
        $stmt = $this->bd->prepare($req);

        $queryData = array(
            ":utid" => $data->user_id,
            ":cid" => $data->categorie_id
        );

        $stmt->execute($queryData);
        $resultat = $stmt->fetch();

        return $resultat;
    }

    public function getCategoriesFavories($id)
    {
        $req = "SELECT c.id, c.nom FROM categories_favories cf, categorie c, utilisateur u WHERE u.id = :uid AND c.id = cf.categorie;";
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
}
