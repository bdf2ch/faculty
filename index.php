<?php
    require_once $_SERVER["DOCUMENT_ROOT"]."/serverside/libs/xtemplate/xtemplate.class.php";

    $template = new XTemplate($_SERVER["DOCUMENT_ROOT"]."/serverside/templates/application.html");
    $template -> parse("main");
    $template -> out("main");

?>