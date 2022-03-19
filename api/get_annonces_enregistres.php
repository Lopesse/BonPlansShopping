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
$data = json_decode(file_get_contents('php://input'));
// var_dump($data);
// exit(0);
$annoncesEnregistres = 0;
if ($data) {
    $annoncesEnregistres = $annonceStorage->get_annonces_enregistres($data);
}
echo json_encode($annoncesEnregistres);
