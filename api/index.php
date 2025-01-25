<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if (!isset($_GET['prompt']) || empty($_GET['prompt'])) {
    http_response_code(400);
    echo json_encode(["error" => "Prompt parameter is required."]);
    exit;
}

$prompt = urlencode($_GET['prompt']);
$apiUrl = "http://fi4.bot-hosting.net:22869/api/image?prompt=" . $prompt;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
$response = curl_exec($ch);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(["error" => "cURL Error: " . curl_error($ch)]);
    exit;
}

$httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpStatus !== 200) {
    http_response_code($httpStatus);
    echo json_encode(["error" => "API returned status code $httpStatus."]);
    exit;
}

echo $response;
