<?php

require_once "database.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request."
    ]);
    exit;
}

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$message = trim($_POST["message"] ?? "");


/* Validation */

if ($name === "" || $email === "" || $message === "") {

    echo json_encode([
        "success" => false,
        "message" => "Please fill in all fields."
    ]);

    exit;
}


if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

    echo json_encode([
        "success" => false,
        "message" => "Please enter a valid email address."
    ]);

    exit;
}


/* Save message */

$sql = "INSERT INTO messages (name, email, message)
        VALUES (:name, :email, :message)";

$stmt = $pdo->prepare($sql);

$stmt->execute([
    ":name" => $name,
    ":email" => $email,
    ":message" => $message
]);


echo json_encode([
    "success" => true,
    "message" => "Message sent successfully."
]);