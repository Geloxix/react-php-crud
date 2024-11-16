<?php

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {

        try {

            require_once "/xampp/htdocs/MyWebsites/CRUD/backend/config/dbh.inc.php";

            $sql = "SELECT id, first_name, last_name, email FROM users";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();

            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
           
            http_response_code(200);
            echo json_encode([ 'success' => true, 'users' => $users]);
            
            $stmt = null;
            exit();
        } catch (PDOException $e) {
            echo json_encode([ 'success' => false, 'message' => 'Query failed']);
            exit();
        }
    }   

?>