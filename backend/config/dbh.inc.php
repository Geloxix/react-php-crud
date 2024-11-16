<?php
    require __DIR__ . '/bootstrap.php';

    $dbhost = $_ENV['DB_HOST'];
    $dbname = $_ENV['DB_NAME'];
    $dbuser = $_ENV['DB_USER'];
    $dbpass = $_ENV['DB_PASS'];

    try {

        $pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    } catch (PDOException $e) {
        echo json_encode([ 'success' => false, 'message' => $e->getMessage()]);
    }
?>