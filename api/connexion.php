<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('Database.php');
include_once('model/UtilisateurStorage.php');
include_once('model/Utilisateur.php');

$db = new Database();

$db = $db->connect();


$utilisateurStorage = new UtilisateurStorage($db);

$data = array();
$data['identifiant'] = isset($_GET['identifiant']) ? $_GET['identifiant'] : die();
$data['mdp'] = isset($_GET['mdp']) ? $_GET['mdp'] : die();

if ($data) {
    $connexionUser = $utilisateurStorage->connexion($data);
    $connexionUser ? header('HTTP/1.1 200 OK') : header('HTTP/1.1 501 Internal Server Error');
}
echo json_encode($connexionUser);
