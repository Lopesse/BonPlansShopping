<?php
    class Post {
        private $nom_produit;
        private $categorie;
        private $user;
        private $date_expiration;

        public function __construct($nom, $categorie, $user, $date_expiration){
            $this->nom_produit = $nom;
            $this->categorie = $categorie;
            $this->user = $user;
            $this->date_expiration = $date_expiration;
        }

        public function getNom() {
            return $this->nom_produit;
        }

        public function getCategorie(){
            return $this->categorie;
        }

        public function getUser(){
            return $this->user;
        }

        public function getExpiration(){
            return $this->date_expiration;
        }
    }