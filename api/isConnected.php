<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include_once('Database.php');
include_once('model/UtilisateurStorage.php');
include_once('model/Utilisateur.php');

$db = new Database();

$db = $db->connect();


$data = json_decode(file_get_contents('php://input'));

public function connexion($data){
    $req = "SELECT * FROM utilisateur WHERE (Email= :pseudoOuEmail AND MDP= :MDP) OR (Pseudo= :pseudoOuEmail AND MDP= :mdp)";

    $stmt = $this->db->prepare($req);       

    $data = array(":pseudoOuEmail" => $pseudoOuEmail);
    $stmt->execute($data);
    $queryUtilisateur = $stmt->fetch();
    $correct = null;
    if($queryUtilisateur){
        $correct = true;
    }
    else{
        $correct = false;
    }
    return $correct;
}
if($data){
    $connected = $db->connexion($data);
    if($connected == true){
        <console class="log">vous etes connecté</console>;
    }
    else{
        echo 'mdp ou user incorrect';
    }
    //echo json_encode($newId);
}
else
    echo json_encode(-1);