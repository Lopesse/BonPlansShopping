<?php

include_once('Categorie.php');

class Annonce
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
        $req = "SELECT a.id, titre, dateCreation, dateExpiration,
                        sc.nom AS sousCategorie, nomMagasin, adresseMagasin,
                        u.pseudo AS utilisateur, image,
                        c.nom AS categorie
                FROM annonce a, categorie c, souscategories sc, utilisateur u 
                WHERE a.categorie = c.id
                AND a.souscategorie = sc.id
                AND utilisateur = u.id
                AND a.id = :identifiant";

        $stmt = $this->bd->prepare($req);
        $data = array(":identifiant" => $this->id);

        $stmt->execute($data);
        $postArray = $stmt->fetch();
        $post = array();
        if ($postArray) {
            $post = array(
                'id' => $postArray['id'],
                'titre' => $postArray['titre'],
                'categorie' => $postArray['categorie'],
                'sous_categorie' => $postArray['sousCategorie'],
                'date_expiration' => $postArray['dateExpiration'],
                'date_creation' => $postArray['dateCreation'],
                'nom_magasin' => $postArray['nomMagasin'],
                'adresse_magasin' => $postArray['adresseMagasin'],
                'utilisateur' => $postArray['utilisateur'],
                'image' => $postArray['image'],
            );
        }
        return $post;
    }


    public function readAll()
    {
        $req = "SELECT a.id, titre, dateCreation, dateExpiration,
                        sc.nom AS sousCategorie, nomMagasin, adresseMagasin,
                        u.pseudo AS utilisateur, image,
                        c.nom AS categorie
        FROM annonce a, categorie c, souscategories sc, utilisateur u 
        WHERE a.categorie = c.id
        AND a.souscategorie = sc.id
        AND utilisateur = u.id";
        $stmt = $this->bd->query($req);
        $queryArray = $stmt->fetchAll();
        $postArray = array();

        foreach ($queryArray as $key => $value) {
            $post = array(
                'id' => $value['id'],
                'titre' => $value['titre'],
                'categorie' => $value['categorie'],
                'sous_categorie' => $value['sousCategorie'],
                'date_expiration' => $value['dateExpiration'],
                'date_creation' => $value['dateCreation'],
                'nom_magasin' => $value['nomMagasin'],
                'adresse_magasin' => $value['adresseMagasin'],
                'utilisateur' => $value['utilisateur'],
                'image' => $value['image'],
            );
            $postArray[$value['id']] = $post;
        }
        return $postArray;
    }


    public function create($data)
    {
        $categorie = new Categorie($this->bd);

        $categorie_id = $categorie->getByName($data->categorie)['categorie_id'];

        $req = "INSERT INTO annonce (nom_produit, categorie_id, utilisateur, date_expiration, prix) 
                    VALUES (:nom, :categorie, :user, :expiration, :prix);";

        $stmt = $this->bd->prepare($req);


        $this->nom_produit = htmlspecialchars(strip_tags($data->nom));
        $this->categorie = intval($categorie_id);
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

    // public function delete($id){
    //     $req = "DELETE FROM albums WHERE id=:identifiant";
    //     $stmt = $this->bd->prepare($req);
    //     $data = array(":identifiant" => $id);
    //     $stmt->execute($data);
    // }

    // public function update($id, $newData){
    //     $req = "UPDATE albums SET name = :nom, artiste = :artiste, annee = :annee, genre = :genre, img_src = :img WHERE id=:identifiant;";
    //     $stmt = $this->bd->prepare($req);
    //     $data = array(":nom" => $newData["nom"], ":artiste" => $newData["artiste"], ":annee" => $newData["annee"], ":genre" => $newData["genre"],":img" => $newData["image"], ":identifiant" => $id);
    //     $stmt->execute($data);
    //     return $id;
    // }

    // public function rechercheBase($terme){
    //     $req = "SELECT id, name FROM albums WHERE name LIKE :terme ;";
    //     $stmt = $this->bd->prepare($req);
    //     $stmt->execute(array("terme" => "%".$terme."%"));
    //     $trouves = $stmt->fetchAll();
    //     return $trouves;
    // }


}
