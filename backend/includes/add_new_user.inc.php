<?php

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $data = json_decode(file_get_contents('php://input'), true);

        $firstname = $data['firstname'];
        $lastname = $data['lastname'];
        $email = $data['email'];
        $username = $data['username'];
        $password = $data['password'];

        try {

            require_once "/xampp/htdocs/MyWebsites/CRUD/backend/config/dbh.inc.php";

            if (empty($firstname) || empty($lastname) || empty($email) || empty($username) || empty($password)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Please fill in all required fields!']);
                exit();
            }

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Invalid email used!']);
                exit();
            }

            $sql = 'INSERT INTO users (first_name, last_name, email, user_name, pword) values (:first_name, :last_name, :email, :user_name, :pword)';
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':first_name', $firstname);
            $stmt->bindParam(':last_name', $lastname);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':user_name', $username);
            $stmt->bindParam(':pword', $password);

            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode([ 'success' => true, 'message' => 'New user added successfully!']);
            } else {
                http_response_code(401);
                echo json_encode([ 'success' => false, 'message' => 'Failed to execute!']);
            }
            
            $pdo = null;
            $stmt = null;

            exit();
        } catch (PDOException $e) {
            echo json_encode([ 'success' => false, 'message' =>  'Query failed!', 'error' => $e->getMessage()]);
        }
       
    }
?>