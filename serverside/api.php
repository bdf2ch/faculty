<?php
    require_once $_SERVER["DOCUMENT_ROOT"]."/serverside/config.php";

    $postdata = json_decode(file_get_contents('php://input'));
    $link = mysql_connect($db_host, $db_user, $db_password);
    if (!$link)
        die("Не удалось установить соединение с БД: ".mysql_errno()." - ".mysql_error());

    if (!mysql_select_db($db_name))
        die("Unable to select db: ".mysql_error());

    if (isset($postdata["action"])) {
        switch ($postdata -> action) {
            case "test":
                test($postdata -> data);
                break;
        }
    }



    function test ($data) {

    }



    function getUsers () {
        $result = array();
        $query = mysql_query("SELECT * FROM users", $link);
        if (!query)
            return json_encode("error");
        else {
            while ($row = mysql_fetch_assoc($query)) {
                array_push($row);
            }
            return json_encode($result);
        }
    }

?>