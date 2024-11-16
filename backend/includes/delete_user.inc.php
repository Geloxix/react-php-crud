<?php

    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

        $id = isset($_GET['id']) ? $_GET['id'] : null;

        try {

            require_once "/xampp/htdocs/MyWebsites/CRUD/backend/config/dbh.inc.php";

            $sql = "DELETE FROM users WHERE id = :id";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':id', $id);

            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode([ 'success' => true, 'message' => 'User deleted successfully']);
            } else {
                http_response_code(400);
                echo json_encode([ 'success' => false, 'message' => 'Failed to delete user!']);
            }

            $pdo = null;
            $stmt = null;
            exit();
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Query failed!','error' => $e->getMessage()]);
            exit();
        }
    }

?>