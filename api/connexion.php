<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('Database.php');
include_once('model/UtilisateurStorage.php');
include_once('model/Utilisateur.php');

$db = new Database();

$db = $db->connect();


// $data = json_decode(file_get_contents('php://input'));
$data = array();
$data['identifiant'] = isset($_GET['identifiant']) ? $_GET['identifiant'] : die();
$data['mdp'] = isset($_GET['mdp']) ? $_GET['mdp'] : die();

if ($data) {
    $connexionUser = $db->connexion($data);
    if ($connexionUser) echo json_encode($connexionUser);
    else echo json_encode(-1);
} else echo json_encode(-1);
