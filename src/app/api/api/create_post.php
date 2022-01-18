<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include_once('Database.php');
include_once('model/PostStorage.php');
include_once('model/Categorie.php');

$db = new Database();

$db = $db->connect();


$postStorage = new PostStorage($db);

$data = json_decode(file_get_contents('php://input'));


if($data){
    $newId = $postStorage->create($data);
    echo json_encode($newId);
}
else
    echo json_encode(-1);


