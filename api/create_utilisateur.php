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


$utilisateurStorage = new UtilisateurStorage($db);

$data = json_decode(file_get_contents('php://input'));


if ($data) {
    $newUser = $utilisateurStorage->create($data);
    $newUser instanceof PDOException ? header('HTTP/1.1 501 Internal Server Error') : header('HTTP/1.1 201 Created');
}



echo json_encode($newUser);
