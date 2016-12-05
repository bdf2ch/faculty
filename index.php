<?php
    require_once $_SERVER["DOCUMENT_ROOT"]."/serverside/libs/xtemplate/xtemplate.class.php";
    require_once $_SERVER["DOCUMENT_ROOT"]."/serverside/api.php";

    $template = new XTemplate($_SERVER["DOCUMENT_ROOT"]."/serverside/templates/application.html");
    session_start();

    $template -> assign("USERS", getUsers());
    $template -> assign("NEWS", getNews());
    $template -> assign("TAGS", getTags());
    $template -> assign("DISCIPLINES", getDisciplines());
    $template -> assign("RESULTS", getResults());
    $template -> assign("SPECIALITIES", getSpecialities());

    $template -> parse("main");
    $template -> out("main");

?>