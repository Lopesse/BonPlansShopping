<?php
    class Database {
        private $host = 'localhost';
        private $db_name = 'bon_plans';
        private $username = 'root';
        private $password = 'root';
        private $connexion;

        public function connect(){
            $this->connexion = null;
            try {
                $this->connexion = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name,
                $this->username, $this->password);
                $this->connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                echo 'Erreur connexion: ' . $e->getMessage();
            }

            return $this->connexion;
        }
    }