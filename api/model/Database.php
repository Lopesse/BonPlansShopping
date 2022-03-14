<?php


class Database
{
    private $host = '127.0.0.1';
    private $db_name = 'bonsplansshopping';
    private $username = 'root';
    private $password = 'Chamora.25';
    private $connexion;

    public function connect()
    {
        $this->connexion = null;
        try {
            $this->connexion = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name . ';charset=utf8mb4', $this->username, $this->password);

            $this->connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo 'Erreur connexion: ' . $e->getMessage();
        }
        return $this->connexion;
    }
}
