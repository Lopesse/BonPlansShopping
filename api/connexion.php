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
    if ($connexionUser) echo json_encode($connexionUser);
    else echo json_encode(-1); // envoyer code d'erreur htttp
} else echo json_encode(array('message' => 'data non fournie'));
