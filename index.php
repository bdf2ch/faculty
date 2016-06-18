<?php
    require_once $_SERVER["DOCUMENT_ROOT"]."/serverside/libs/xtemplate/xtemplate.class.php";
    require_once $_SERVER["DOCUMENT_ROOT"]."/serverside/api.php";

    $template = new XTemplate($_SERVER["DOCUMENT_ROOT"]."/serverside/templates/application.html");

    $template -> assign("USERS", getUsers());

    $template -> parse("main");
    $template -> out("main");

?>