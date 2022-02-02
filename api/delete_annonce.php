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


$postStorage = new Annonce($db);

$data = json_decode(file_get_contents('php://input'));

$deleted = $postStorage->delete($data->id);

if ($deleted) echo json_encode("ok");
else echo json_encode("ko");
