<?php

include_once('Categorie.php');

class PostStorage
{
    private $bd;

    public $nom_produit;
    public $categorie;
    public $user;
    public $prix;
    public $date_expiration;
    public $id;

    public function __construct(PDO $bd)
    {
        $this->bd = $bd;
    }


    public function read()
    {
        $req = "SELECT * FROM annonce NATURAL JOIN categorie WHERE id = :identifiant";
        $stmt = $this->bd->prepare($req);
        $data = array(":identifiant" => $this->id);
        $stmt->execute($data);
        $postArray = $stmt->fetch();
        $post = array();
        if ($postArray) {
            $post = array(
                'nom_produit' => $postArray['nom_produit'],
                'categorie' => $postArray['categorie'],
                'date_expiration' => $postArray['date_expiration'],
                'prix' => $postArray['prix'],
                'user_id' => $postArray['user_id'],
                'id' => $postArray['id']
            );
        }
        return $post;
    }


    public function readAll()
    {
        $req = "SELECT * FROM posts NATURAL JOIN category";
        $stmt = $this->bd->query($req);
        $queryArray = $stmt->fetchAll();
        $postArray = array();

        foreach ($queryArray as $key => $value) {
            $post = array(
                'nom_produit' => $value['nom_produit'],
                'categorie' => $value['categorie'],
                'date_expiration' => $value['date_expiration'],
                'prix' => $value['prix'],
                'user_id' => $value['user_id'],
                'id' => $value['id']
            );
            $postArray[$key] = $post;
        }
        return $postArray;
    }


    public function create($data)
    {
        $categorie = new Categorie($this->bd);

        $categorie_id = $categorie->getIdByName($data->categorie);

        $req = "INSERT INTO posts (nom_produit, categorie_id, user_id, date_expiration, prix) 
                    VALUES (:nom, :categorie, :user, :expiration, :prix);";

        $stmt = $this->bd->prepare($req);


        $this->nom_produit = htmlspecialchars(strip_tags($data->nom));
        $this->categorie = $categorie_id;
        $this->user = intval(htmlspecialchars(strip_tags($data->user_id)));
        $this->date_expiration = htmlspecialchars(strip_tags($data->date_expiration));
        $this->prix = floatval(htmlspecialchars(strip_tags($data->prix)));


        $post_data = array(
            ':nom' => $this->nom_produit,
            ':categorie' => $this->categorie,
            ':user' => $this->user,
            ':expiration' => $this->date_expiration,
            ':prix' => $this->prix
        );

        $stmt->execute($post_data);

        $this->id = $this->bd->lastInsertId();

        return $this->id;
    }

    public function delete($id)
    {
        $req = "DELETE FROM posts WHERE post_id=:identifiant";
        $stmt = $this->bd->prepare($req);
        $data = array(":identifiant" => $id);
        if ($stmt->execute($data))
            return true;
        else
            return false;
    }

    public function update($data)
    {
        $req = "UPDATE posts 
                    SET nom_produit = :nom, categorie_id = :categorie, user_id = :user, prix = :prix, date_expiration = :expiration 
                    WHERE post_id=:identifiant;";

        $stmt = $this->bd->prepare($req);

        $categorie = new Categorie($this->bd);
        $categorie_id = $categorie->getIdByName($data->categorie);


        $this->nom_produit = htmlspecialchars(strip_tags($data->nom));
        $this->categorie = $categorie_id;
        $this->user = intval(htmlspecialchars(strip_tags($data->user_id)));
        $this->date_expiration = htmlspecialchars(strip_tags($data->date_expiration));
        $this->prix = floatval(htmlspecialchars(strip_tags($data->prix)));

        $new_data = array(
            ':nom' => $this->nom_produit,
            ':categorie' => $this->categorie,
            ':user' => $this->user,
            ':expiration' => $this->date_expiration,
            ':prix' => $this->prix,
            ':identifiant' => $data->post_id
        );

        $stmt->execute($new_data);

        return $data->post_id;
    }

    // public function rechercheBase($terme){
    //     $req = "SELECT id, name FROM albums WHERE name LIKE :terme ;";
    //     $stmt = $this->bd->prepare($req);
    //     $stmt->execute(array("terme" => "%".$terme."%"));
    //     $trouves = $stmt->fetchAll();
    //     return $trouves;
    // }


}
