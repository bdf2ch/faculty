<?php
    require_once $_SERVER["DOCUMENT_ROOT"]."/serverside/libs/xtemplate/xtemplate.class.php";
    require_once $_SERVER["DOCUMENT_ROOT"]."/serverside/api.php";

    $template = new XTemplate($_SERVER["DOCUMENT_ROOT"]."/serverside/templates/application.html");

    $template -> assign("USERS", getUsers());
    $template -> assign("NEWS", getNews());
    $template -> assign("DISCIPLINES", getDisciplines());
    $template -> assign("RESULTS", getResults());

    $template -> parse("main");
    $template -> out("main");

?>