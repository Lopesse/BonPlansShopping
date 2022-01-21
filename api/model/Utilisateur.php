<?php
    class Utilisateur {
        public $pseudo;  
        public $ID;
        public $email;
        //public $photo;
        //public $categoriesFav
        public $mdp;
        

        public function __construct($pseudo, $ID, $email,/* $photo, $categoriesFav,*/ $mdp){
            $this->pseudo = $pseudo;
            $this->ID = $ID;
            $this->email = $email;
            //$this->photo = $photo;
            //$this->categoriesFav = $categoriesFav;
            $this->mdp = $mdp;

        }

        public function getPseudo() {
            return $this->pseudo;
        }

        public function getID() {
            return $this->ID;
        }

        public function getEmail() {
            return $this->email;
        }

        /*public function getPhoto() {
            return $this->photo;
        }

        public function getCategoriesFav() {
            return $this->categoriesFav;
        }*/

        public function getMDP() {
            return $this->MDP;
        }

        
    }