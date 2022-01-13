<?php

    include_once('Categorie.php');

    class PostStorage {
        private $bd;

        public $nom_produit;
        public $categorie;
        public $user;
        public $prix;
        public $date_expiration;
        public $id;

        public function __construct(PDO $bd){
            $this->bd = $bd;
        }


        public function read(){
            $req = "SELECT * FROM posts NATURAL JOIN category WHERE post_id = :identifiant";
            $stmt = $this->bd->prepare($req);
            $data = array(":identifiant" => $this->id);
            $stmt->execute($data);
            $postArray = $stmt->fetch();
            $post = array();
            if($postArray){
                $post = array(
                    'nom_produit' => $postArray['nom_produit'],
                    'categorie' => $postArray['categorie'],
                    'date_expiration' => $postArray['date_expiration'],
                    'prix' => $postArray['prix'],
                    'user_id' => $postArray['user_id'],
                    'post_id' => $postArray['post_id']
                );
            }
            return $post;            
        }


        public function readAll(){
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
                    'post_id' => $value['post_id']
                );
                $postArray[$value['post_id']] = $post;
            }
            return $postArray;
        }


        public function create($data){
            $categorie = new Categorie($this->bd);
            
            $categorie_id = $categorie->getByName($data->categorie)['categorie_id'];

            $req = "INSERT INTO posts (nom_produit, categorie_id, user_id, date_expiration, prix) 
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

?>