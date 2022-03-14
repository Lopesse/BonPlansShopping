<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('model/Database.php');
include_once('model/Annonce.php');

$db = new Database();

$db = $db->connect();


$postStorage = new Annonce($db);

$postStorage->id = isset($_GET['id']) ? $_GET['id'] : die();

$post = $postStorage->read($id);

echo json_encode($post);
