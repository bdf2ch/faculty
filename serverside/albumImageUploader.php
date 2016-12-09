<?php
    require_once $_SERVER["DOCUMENT_ROOT"].DIRECTORY_SEPARATOR."serverside".DIRECTORY_SEPARATOR."config.php";
    $DS = DIRECTORY_SEPARATOR;

    if (isset($_FILES["file"])) {

        if ($_FILES["file"]["size"] == 0) {
            echo("Размер загружаемого файла равен 0");
            return false;
        }

        if (!file_exists($_SERVER["DOCUMENT_ROOT"].$DS."uploads".$DS."albums")) {
            echo("Папка 'uploads/albums'"." не найдена");
            return false;
        }

        $albumId = $_POST["albumId"];
        $userId = $_POST["userId"];
        //$title = $_POST["title"];
        $added = time();
        $tmpName  = $_FILES["file"]["tmp_name"];
        $size = $_FILES["file"]["size"];

        if (!file_exists($_SERVER["DOCUMENT_ROOT"].$DS."uploads".$DS."albums".$DS.$albumId)) {
            if (!mkdir($_SERVER["DOCUMENT_ROOT"].$DS."uploads".$DS."albums".$DS.$albumId)) {
                echo("Не удалось создать папку '".$articleId."'");
                return false;
            }
        }


        $mysqli = new mysqli($db_host, $db_user, $db_password, $db_name);
        if ($mysqli -> connect_errno) {
            echo "Не удалось подключиться к MySQL: " . $mysqli -> connect_error;
        }

        $encoding = mysqli_query($mysqli, "SET NAMES utf8");
        if (!$encoding) {
            echo "Не удалось выполнить запрос: (" . $mysqli -> errno . ") " . $mysqli -> error;
        }

        $name = $_FILES["file"]["name"];
        $encoding = mb_detect_encoding($_FILES["file"]["name"]);
        $name1251 = mb_convert_encoding($_FILES["file"]["name"], "WINDOWS-1251", $encoding);
        $imageUrl = mysqli_real_escape_string($mysqli, $DS."uploads".$DS."albums".$DS.$albumId.$DS.$name1251);

        if (!move_uploaded_file($tmpName, $_SERVER["DOCUMENT_ROOT"].$DS."uploads".$DS."albums".$DS.$albumId.$DS.$name1251)) {
            echo("Не удалось переместить загруженный файл");
            return false;
        }

        $query = mysqli_query($mysqli, "INSERT INTO photos (album_id, user_id, size, url, added) VALUES ($albumId, $userId, $size, '$imageUrl', $added)");
        if (!$query) {
            echo "Не удалось выполнить запрос: (".$mysqli -> errno.") ".$mysqli -> error;
            return false;
        }

        $photoId = mysqli_insert_id($mysqli);
        $query = mysqli_query($mysqli, "SELECT * FROM photos WHERE ID = $photoId");
        if (!$query) {
            echo "Не удалось выполнить запрос: (".$mysqli -> errno.") ".$mysqli -> error;
        }

        echo(json_encode(mysqli_fetch_assoc($query)));
        return true;

    } else {
        echo("Загружаемый файл отсутствует");
        return false;
    }

?>