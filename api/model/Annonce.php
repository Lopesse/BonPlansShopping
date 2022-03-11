<?php

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
                        sc.nom AS sousCategorie, sc.id AS sousCategorie_id, 
                        nomMagasin, adresseMagasin,
                        u.pseudo AS utilisateur, image,
                        c.nom AS categorie, c.id AS categorie_id
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
                'categorie' => array('nom' => $postArray['categorie'], 'id' => $postArray['categorie_id']),
                'sous_categorie' => array('nom' => $postArray['sousCategorie'], 'id' => $postArray['sousCategorie_id']),
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
                        nomMagasin, adresseMagasin,
                        sc.nom AS sousCategorie, sc.id AS sousCategorie_id,
                        u.pseudo AS utilisateur, image,
                        c.nom AS categorie, c.id AS categorie_id
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
                'categorie' => array('nom' => $value['categorie'], 'id' => $value['categorie_id']),
                'sous_categorie' => array('nom' => $value['sousCategorie'], 'id' => $value['sousCategorie_id']),
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

    public function update($data)
    {
        $req = "UPDATE annonce
                SET  titre = :titre,
                    dateExpiration = :dateExpiration,
                    sousCategorie = :sousCategorie,
                    nomMagasin = :nomMagasin,
                    adresseMagasin = :adresseMagasin,
                    image = :image,
                    categorie = :categorie,
                    description = :description
                WHERE id = :id;";

        $stmt = $this->bd->prepare($req);

        $post_data = array(
            ":titre" => $data->titre,
            ":dateExpiration" => $data->dateExpiration,
            ":categorie" => $data->categorie,
            ":sousCategorie" => $data->sousCategorie,
            ":nomMagasin" => $data->nomMagasin,
            ":adresseMagasin" => $data->adresseMagasin,
            ":image" => $data->image,
            ":description" => $data->description,
            ":id" => $data->id
        );

        $stmt->execute($post_data);
        return $data->id;
    }
}
