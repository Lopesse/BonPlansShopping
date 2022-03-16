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
$newId = -1;
if ($_POST) {
    if ($_FILES) $img_nom = $_FILES["image"]["name"];
    $newId = $postStorage->create($_POST, $img_nom);
    $newId !== -1 ? header('HTTP/1.1 201 Created') : header('HTTP/1.1 501 Internal Server Error');
}
echo json_encode($newId);
