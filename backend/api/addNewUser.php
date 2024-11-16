<?php

    //allowing freeflight
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH,  DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");    

    require_once "/xampp/htdocs/MyWebsites/CRUD/backend/includes/add_new_user.inc.php";

?>