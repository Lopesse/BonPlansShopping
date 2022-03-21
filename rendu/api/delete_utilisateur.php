<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include_once('model/Database.php');
include_once('model/Utilisateur.php');

$db = new Database();

$db = $db->connect();

$userStorage = new Utilisateur($db);

$data = json_decode(file_get_contents('php://input'));

$res = $userStorage->deleteUser($data);

if ($res)
    echo json_encode($res);
else
    echo json_encode(-1);
