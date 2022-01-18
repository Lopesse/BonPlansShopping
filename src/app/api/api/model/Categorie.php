<?php
    class Categorie {
        public $categorie;  
        public $categorie_id;

        public function __construct(PDO $bd){
            $this->bd = $bd;
        }


        public function read(){
            $req = "SELECT * FROM category WHERE categorie_id = :identifiant";
            $stmt = $this->bd->prepare($req);
            $data = array(":identifiant" => $this->id);
            $stmt->execute($data);
            $categorieArray = $stmt->fetch();
            $categorie = array();
            if($categorieArray){
                $categorie = array(
                    'categorie' => $categorieArray['categorie'],
                    'categorie_id' => $categorieArray['categorie_id'],
                );
            }
            return $categorie;            
        }


        public function readAll(){
            $req = "SELECT * FROM category";
            $stmt = $this->bd->query($req);
            $queryArray = $stmt->fetchAll();

            $categorieArray = array();

            foreach ($queryArray as $key => $value) {
                $categorie = array(
                    'categorie' => $value['categorie'],
                    'categorie_id' => $value['categorie_id'],
                );
                $categorieArray[$value['categorie_id']] = $categorie;
            }
            return $categorieArray;
        }

        public function getIdByName($categorie){
            $req = "SELECT * FROM category WHERE categorie = :categorie";
            $stmt = $this->bd->prepare($req);
            $data = array(":categorie" => $categorie);
            $stmt->execute($data);
            $queryCategorie = $stmt->fetch();
            $categoryId = null;
            if($queryCategorie){
                $categoryId = $queryCategorie['categorie_id'];
                // $queryCategorie = array(
                //     'categorie' => $queryCategorie['categorie'],
                //     'categorie_id' => $queryCategorie['categorie_id'],
                // );
            }
            return $categoryId;

        }
    }