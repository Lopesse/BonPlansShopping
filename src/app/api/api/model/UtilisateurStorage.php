<?php

include_once('Utilisateur.php');

class UtilisateurStorage
{
    private $bd;

    public $pseudo;  
    public $ID;
    public $email;
    //public $photo;
    //public $categoriesFav
    public $mdp;

    public function __construct(PDO $bd)
    {
        $this->bd = $bd;
    }

public function read($id){
            $req = "SELECT * FROM utilisateur WHERE ID = :id";
            $stmt = $this->bd->prepare($req);
            $data = array(":id" => $this->id);
            $stmt->execute($data);
            $utilisateurArray = $stmt->fetch();
            $utilisateur = array();
            if($CArray){
                $utilisateur = array(
                    'ID' => $utilisateurArray['ID'],
                    'Pseudo' => $utilisateurArray['Pseudo'],
                    'Email' => $utilisateurArray['Email'],
                    //'Photo' => $utilisateurArray['Photo'],
                    //'CategoriesFav' => $utilisateurArray['CategoriesFav'],
                    'MDP' => $utilisateurArray['MDP'],
                );
            }
            return $utilisateur;            
        }


        public function readAll(){
            $req = "SELECT * FROM utilisateur";
            $stmt = $this->bd->query($req);
            $queryArray = $stmt->fetchAll();

            $utilisateurArray = array();

            foreach ($queryArray as $key => $value) {
                $utilisateur = array(
                    'Pseudo' => $value['Pseudo'],
                    'ID' => $value['ID'],
                    'Email' => $value['Email'],
                    //'Photo' => $value['Photo'],
                    //'CategoriesFav' => $utilisateurArray['CategoriesFav'],
                    'MDP' => $value['MDP'],
                );
                $utilisateurArray[$value['ID']] = $utilisateur;
            }
            return $utilisateurArray;
        }

        public function getIdByName($pseudo){
            $req = "SELECT * FROM utilisateur WHERE Pseudo = :pseudo";
            $stmt = $this->bd->prepare($req);
            $data = array(":pseudo" => $pseudo);
            $stmt->execute($data);
            $queryUtilisateur = $stmt->fetch();
            $utilisateurId = null;
            if($queryUtilisateur){
                $utilisateurId = $queryUtilisateur['ID'];
                // $queryCategorie = array(
                //     'categorie' => $queryCategorie['categorie'],
                //     'categorie_id' => $queryCategorie['categorie_id'],
                // );
            }
            return $utilisateurId;
        }
            public function create($data)
            {
                //$utilisateur = new Utilisateur($this->bd);
        
                $req = "INSERT INTO utilisateur (Pseudo, Email,/* Photo, CategoriesFav,*/ MDP) 
                            VALUES (:pseudo, :email,/* :photo, :categoriesFav,*/ :MDP);";
        
                $stmt = $this->bd->prepare($req);
        
        
                $this->pseudo = htmlspecialchars(strip_tags($data->pseudo));
                $this->email = htmlspecialchars(strip_tags($data->email));
                //$this->photo = htmlspecialchars(strip_tags($data->photo));
                //$this->categoriesFav = htmlspecialchars(strip_tags($data->categoriesFav));
                $this->mdp = htmlspecialchars(strip_tags($data->MDP));
        
        
                $utilisateur_data = array(
                    ':pseudo' => $this->pseudo,
                    ':email' => $this->email,
                    //':photo' => $this->photo,
                    //':categoriesFav' => $this->categoriesFav,
                    ':MDP' => $this->mdp
                );
        
                $stmt->execute($utilisateur_data);
        
                $this->ID = $this->bd->lastInsertId();
        
                return $this->ID;
            }

            
        
            /*public function delete($id)
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
            }*/
        }