<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('Database.php');
include_once('model/PostStorage.php');

$db = new Database();

$db = $db->connect();


$postStorage = new PostStorage($db);

$postStorage->id = isset($_GET['id']) ? $_GET['id'] : die();

$post = $postStorage->read();

echo json_encode($post);