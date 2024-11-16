<?php
    header('Access-Control-Allow-Origin: http://localhost:5173');
    // header('Content-Type: application/json');
    // header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");


    require_once "/xampp/htdocs/MyWebsites/CRUD/backend/includes/getUsers.php";
    // require_once "/xampp/htdocs/MyWebsites/CRUD/backend/includes/updateUser.php";
?>