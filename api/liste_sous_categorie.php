<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('Database.php');
include_once('model/Categorie.php');

$db = new Database();

$db = $db->connect();

$categorie = new Categorie($db);

$res = $categorie->getSousCategories();

echo json_encode($res);
