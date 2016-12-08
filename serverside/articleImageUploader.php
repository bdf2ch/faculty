<?php
    require_once $_SERVER["DOCUMENT_ROOT"].DIRECTORY_SEPARATOR."serverside".DIRECTORY_SEPARATOR."config.php";
    $DS = DIRECTORY_SEPARATOR;

    if (isset($_FILES["file"])) {

        if ($_FILES["file"]["size"] == 0) {
            echo("Размер загружаемого файла равен 0");
            return false;
        }

        if (!file_exists($_SERVER["DOCUMENT_ROOT"].$DS."uploads".$DS."news")) {
            echo("Папка 'uploads/'".$serviceId." не найдена");
            return false;
        }


        $articleId = $_POST["articleId"];
        $userId = $_POST["userId"];
        $title = $_POST["title"];
        $preview = $_POST["preview"];
        $added = time();
        $tmpName  = $_FILES["file"]["tmp_name"];


        $mysqli = new mysqli($db_host, $db_user, $db_password, $db_name);
        if ($mysqli -> connect_errno) {
            echo "Не удалось подключиться к MySQL: " . $mysqli -> connect_error;
        }

        $encoding = mysqli_query($mysqli, "SET NAMES utf8");
        if (!$encoding) {
            echo "Не удалось выполнить запрос: (" . $mysqli -> errno . ") " . $mysqli -> error;
        }

        if ($articleId == 0) {

            $query = mysqli_query($mysqli, "INSERT INTO news (user_id, title, preview, content, image, tags, timestamp) VALUES ($userId, ' ', ' ', ' ', ' ', ' ', $added)");
            if (!$query) {
                echo "Не удалось выполнить запрос: (".$mysqli -> errno.") ".$mysqli -> error;
                return false;
            }

            $articleId = mysqli_insert_id($mysqli);
            $encoding = mb_detect_encoding($_FILES["file"]["name"]);
            $name1251 = mb_convert_encoding($_FILES["file"]["name"], "WINDOWS-1251", $encoding);
            $imageUrl = mysqli_real_escape_string($mysqli, $DS."uploads".$DS."news".$DS.$articleId.$DS.$name1251);

            if (!file_exists($_SERVER["DOCUMENT_ROOT"].$DS."uploads".$DS."news".$DS.$articleId)) {
                if (!mkdir($_SERVER["DOCUMENT_ROOT"].$DS."uploads".$DS."news".$DS.$articleId)) {
                    echo("Не удалось создать папку '".$articleId."'");
                    return false;
                }
            }

            if (!move_uploaded_file($tmpName, $_SERVER["DOCUMENT_ROOT"].$DS."uploads".$DS."news".$DS.$articleId.$DS.$name1251)) {
                echo("Не удалось переместить загруженный файл");
                return false;
            }

            $query = mysqli_query($mysqli, "UPDATE news SET IMAGE = '$imageUrl' WHERE ID = $articleId");
            if (!$query) {
                echo "Не удалось выполнить запрос: (".$mysqli -> errno.") ".$mysqli -> error;
            }

            $query = mysqli_query($mysqli, "SELECT * FROM news WHERE ID = $articleId");
            if (!$query) {
                echo "Не удалось выполнить запрос: (".$mysqli -> errno.") ".$mysqli -> error;
            }

            echo(json_encode(mysqli_fetch_assoc($query)));
            return true;
        } else {
            $encoding = mb_detect_encoding($_FILES["file"]["name"]);
            $name1251 = mb_convert_encoding($_FILES["file"]["name"], "WINDOWS-1251", $encoding);
            $imageUrl = mysqli_real_escape_string($mysqli, $DS."uploads".$DS."news".$DS.$articleId.$DS.$name1251);

            if (!file_exists($_SERVER["DOCUMENT_ROOT"].$DS."uploads".$DS."news".$DS.$articleId)) {
                if (!mkdir($_SERVER["DOCUMENT_ROOT"].$DS."uploads".$DS."news".$DS.$articleId)) {
                    echo("Не удалось создать папку '".$articleId."'");
                    return false;
                }
            }

            if (!move_uploaded_file($tmpName, $_SERVER["DOCUMENT_ROOT"].$DS."uploads".$DS."news".$DS.$articleId.$DS.$name1251)) {
                echo("Не удалось переместить загруженный файл");
                return false;
            }

            $query = mysqli_query($mysqli, "UPDATE news SET IMAGE = '$imageUrl' WHERE ID = $articleId");
            if (!$query) {
                echo "Не удалось выполнить запрос: (".$mysqli -> errno.") ".$mysqli -> error;
            }

            $query = mysqli_query($mysqli, "SELECT * FROM news WHERE ID = $articleId");
            if (!$query) {
                echo "Не удалось выполнить запрос: (".$mysqli -> errno.") ".$mysqli -> error;
            }

            echo(json_encode(mysqli_fetch_assoc($query)));
            return true;
        }

    } else {
        echo("Загружаемый файл отсутствует");
        return false;
    }

?>