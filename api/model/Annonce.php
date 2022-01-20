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
        $req = "SELECT a.id, titre, dateCreation, dateExpiration, description,
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
                'description' => $postArray['description'],
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
        $req = "SELECT a.id, titre, dateCreation, dateExpiration, description,
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
                'description' => $value['description'],
                'categorie' => $value['categorie'],
                'sous_categorie' => $value['sousCategorie'],
                'date_expiration' => $value['dateExpiration'],
                'date_creation' => $value['dateCreation'],
                'nom_magasin' => $value['nomMagasin'],
                'adresse_magasin' => $value['adresseMagasin'],
                'utilisateur' => $value['utilisateur'],
                'image' => $value['image'],
            );
            $postArray[$key] = $post;
        }
        return $postArray;
    }


    public function create($data)
    {
        // $categorie = new Categorie($this->bd);

        // $categorie_id = $categorie->getByName($data->categorie)['categorie_id'];

        $req = "INSERT INTO annonce 
                (titre,
                dateCreation,
                dateExpiration,
                sousCategorie,
                nomMagasin,
                adresseMagasin,
                utilisateur,
                image,
                categorie,
                description)
        VALUES (:titre,
                :dateCreation,
                :dateExpiration,
                :sousCategorie,
                :nomMagasin,
                :adresseMagasin,
                :utilisateur,
                :image,
                :categorie,
                :description);";

        $stmt = $this->bd->prepare($req);

        $post_data = array(
            ":titre" => $data->titre,
            ":dateCreation" => $data->dateCreation,
            ":dateExpiration" => $data->dateExpiration,
            ":categorie" => $data->categorie,
            ":sousCategorie" => $data->sousCategorie,
            ":nomMagasin" => $data->nomMagasin,
            ":adresseMagasin" => $data->adresseMagasin,
            ":utilisateur" => $data->utilisateur,
            ":image" => $data->image,
            ":description" => $data->description,
        );

        $stmt->execute($post_data);

        $this->id = $this->bd->lastInsertId();

        return $this->id;
    }

    public function delete($id)
    {
        $req = "DELETE FROM annonce WHERE id = :identifiant";
        $stmt = $this->bd->prepare($req);
        $data = array(":identifiant" => $id);
        return $stmt->execute($data);
    }

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
