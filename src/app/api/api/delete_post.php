<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Content-Type');

include_once('Database.php');
include_once('model/PostStorage.php');

$db = new Database();

$db = $db->connect();


$postStorage = new PostStorage($db);


$data = json_decode(file_get_contents('php://input'));

// echo json_encode($data);
if ($data->post_id) {
    $postStorage->delete($data->post_id);
    echo json_encode("OK");
} else echo json_encode("KO");
