<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('Database.php');
include_once('model/PostStorage.php');

$db = new Database();

$db = $db->connect();

if (!$db) echo json_encode(array("m" => "ko"));
else echo json_encode(array("m" => "ok"));
// $postStorage = new PostStorage($db);

// $res = $postStorage->readAll();

// echo json_encode($res);
