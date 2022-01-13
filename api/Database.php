<?php


class Database
{
    private $host = 'mysql.info.unicaen.fr';
    private $db_name = '21903735_bd';
    private $username = '21903735';
    private $password = 'cah7puJeiPhei5Ou';
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
