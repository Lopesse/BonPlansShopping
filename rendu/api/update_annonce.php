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

$annonce_id = -1;
if ($data) {
    $annonce_id = $postStorage->update($data);
    $annonce_id !== -1 ? header('HTTP/1.1 201 Created') : header('HTTP/1.1 501 Internal Server Error');
}

echo json_encode($annonce_id);
