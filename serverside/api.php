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
        global $link;
        $result = array();

        $query = mysql_query("SELECT * FROM users", $link);
        if (!$query)
            return json_encode("error");
        else {
            while ($row = mysql_fetch_assoc($query)) {
                array_push($result, $row);
            }
            return json_encode($result);
        }
    }



    function getNews () {
        global $link;
        $result = array();

        $query = mysql_query("SELECT * FROM news", $link);
        if (!$query)
            return json_encode("error");
        else {
            while ($row = mysql_fetch_assoc($query)) {
                array_push($result, $row);
            }
            return json_encode($result);
        }
    }



    function getDisciplines () {
        global $link;
        $result = array();

        $query = mysql_query("SELECT * FROM disciplines", $link);
        if (!$query)
            return json_encode("error");
        else {
            while ($row = mysql_fetch_assoc($query)) {
                array_push($result, $row);
            }
            return json_encode($result);
        }
    }



    function getResults () {
        global $link;
        $result = array();

        $query = mysql_query("SELECT * FROM results", $link);
        if (!$query)
            return json_encode("error");
        else {
            while ($row = mysql_fetch_assoc($query)) {
                array_push($result, $row);
            }
            return json_encode($result);
        }
    }

?>