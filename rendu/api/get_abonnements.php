<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include_once('model/Database.php');
include_once('model/Annonce.php');

$db = new Database();
$db = $db->connect();

$annonceStorage = new Annonce($db);

$id = isset($_GET['id']) ? $_GET['id'] : die();
$annoncesEnregistres = 0;
if ($id) {
    $annoncesEnregistres = $annonceStorage->readAbonnements($id);
}
echo json_encode($annoncesEnregistres);
