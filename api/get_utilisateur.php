<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('Database.php');
include_once('model/UtilisateurStorage.php');

$db = new Database();

$db = $db->connect();

$userStorage = new UtilisateurStorage($db);

$id = isset($_GET['id']) ? $_GET['id'] : die();

$utilisateur = $userStorage->read($id);

if ($utilisateur)
    echo json_encode($utilisateur);
else
    echo json_encode(-1);
