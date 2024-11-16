<?php

    //allowing freeflight
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH,  DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");    


    if ($_SERVER['REQUEST_METHOD'] == 'PATCH') {

        $data = json_decode(file_get_contents('php://input'), true);
        var_dump($data);
        $userId = $data['id'];
        $firstname = htmlspecialchars($data['firstname']);
        $lastname = htmlspecialchars($data['lastname']);
        $email = htmlspecialchars($data['email']);

        try {
            require_once "/xampp/htdocs/MyWebsites/CRUD/backend/config/dbh.inc.php";

            //sql query
            $sql = 'UPDATE users SET first_name = :first_name, last_name = :last_name, email = :email WHERE id = :id';
            $stmt = $pdo->prepare($sql); //prepare statement

            //bind parameters
            $stmt->bindParam(':first_name', $firstname);
            $stmt->bindParam(':last_name', $lastname);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':id', $userId);

            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode([ 'success' => true, 'message' => 'Update Successfully!']);
            } else {
                http_response_code(401);
                echo json_encode([ 'success' => false, 'message' => 'Failed to execute!']);
            }

            $pdo = null;
            $stmt = null;

            exit();
        } catch (PDOException $e) {
            echo json_encode([ 'success' => false, 'message' => 'Query failed', 'error' => $e->getMessage()]);
            exit();
        }
    }

?>