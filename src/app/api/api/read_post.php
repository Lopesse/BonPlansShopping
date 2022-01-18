<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('Database.php');
include_once('model/PostStorage.php');

$db = new Database();

$db = $db->connect();


$postStorage = new PostStorage($db);

$res = $postStorage->readAll();

echo json_encode($res);
