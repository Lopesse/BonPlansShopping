<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include_once('model/Database.php');
include_once('model/Annonce.php');
include_once('model/Categorie.php');

$db = new Database();
$db = $db->connect();


$utilisateurStorage = new Utilisateur($db);

$data = json_decode(file_get_contents('php://input'));


$res = $utilisateurStorage->suivreCategorie($data);

echo json_encode($res);
