<?php
    require_once $_SERVER["DOCUMENT_ROOT"]."/serverside/libs/xtemplate/xtemplate.class.php";
    require_once $_SERVER["DOCUMENT_ROOT"]."/serverside/api.php";

    $s = file_get_contents('http://ulogin.ru/token.php?token=' . $_POST['token'] . '&host=' . $_SERVER['HTTP_HOST']);
    $user = json_decode($s, true);
    //$user['network'] - соц. сеть, через которую авторизовался пользователь
    //$user['identity'] - уникальная строка определяющая конкретного пользователя соц. сети
    //$user['first_name'] - имя пользователя
    //$user['last_name'] - фамилия пользователя


    $template = new XTemplate($_SERVER["DOCUMENT_ROOT"]."/serverside/templates/application.html");
    session_start();

    $template -> assign("USERS", getUsers());
    $template -> assign("NEWS", getNews());
    $template -> assign("TAGS", getTags());
    $template -> assign("ALBUMS", getAlbums());
    $template -> assign("DISCIPLINES", getDisciplines());
    $template -> assign("RESULTS", getResults());
    $template -> assign("SPECIALITIES", getSpecialities());

    $template -> parse("main");
    $template -> out("main");

?>