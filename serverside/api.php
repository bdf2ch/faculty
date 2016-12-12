<?php
    require_once $_SERVER["DOCUMENT_ROOT"]."/serverside/config.php";

    $postdata = json_decode(file_get_contents('php://input'));
    $link = mysql_connect($db_host, $db_user, $db_password);
    if (!$link)
        die("Не удалось установить соединение с БД: ".mysql_errno()." - ".mysql_error());

    if (!mysql_select_db($db_name))
        die("Unable to select db: ".mysql_error());

    if (isset($postdata -> action)) {
        switch ($postdata -> action) {
            case "login":
                login($postdata -> data);
                break;
            case "addSpeciality":
                addSpeciality($postdata -> data);
                break;
            case "editSpeciality":
                editSpeciality($postdata -> data);
                break;
            case "deleteSpeciality":
                deleteSpeciality($postdata -> data);
                break;
            case "addStudent":
                addStudent($postdata -> data);
                break;
            case "editStudent":
                editStudent($postdata -> data);
                break;
            case "deleteStudent":
                deleteStudent($postdata -> data);
                break;
            case "addProfessor":
                addProfessor($postdata -> data);
                break;
            case "editProfessor":
                editProfessor($postdata -> data);
                break;
            case "deleteProfessor":
                deleteProfessor($postdata -> data);
                break;
            case "addDiscipline":
                addDiscipline($postdata -> data);
                break;
            case "editDiscipline":
                editDiscipline($postdata -> data);
                break;
            case "deleteDiscipline":
                deleteDiscipline($postdata -> data);
                break;
            case "addArticle":
                addArticle($postdata -> data);
                break;
            case "editArticle":
                editArticle($postdata -> data);
                break;
            case "deleteArticle":
                deleteArticle($postdata -> data);
                break;
            case "addResult":
                addResult($postdata -> data);
                break;
            case "editResult":
                editResult($postdata -> data);
                break;
            case "addComment":
                addComment($postdata -> data);
                break;
            case "addAlbum":
                addAlbum($postdata -> data);
                break;
            case "addEvent":
                addEvent($postdata -> data);
                break;
        }
    }



    function login ($data) {
        if ($data != null) {
            $email = $data -> email;
            $password = $data -> password;

            $query = mysql_query("SELECT * FROM users WHERE email = '$email' AND password = '$password' LIMIT 1");
            if (!$query) {
                echo(json_encode("error"));
                return false;
            } else {
                $result = mysql_fetch_assoc($query);
                setcookie("user_id", $result["id"]);
                echo(json_encode($result));
                return true;
            }
        }
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


    function addStudent ($data) {
        if ($data != null) {
            $surname = $data -> surname;
            $name = $data -> name;
            $fname = $data -> fname;
            $specialityId = $data -> specialityId;
            $email = $data -> email;
            $password = $data -> password;

            $query = mysql_query("INSERT INTO users (surname, name, fname, speciality_id, email, password, is_professor) VALUES ('$surname', '$name', '$fname', $specialityId, '$email', '$password', 0)");
            if (!$query) {
                echo(json_encode("error"));
                return false;
            } else {
                $id = mysql_insert_id();
                $query2 = mysql_query("SELECT * FROM users WHERE id = $id");
                if (!$query2) {
                    echo(json_encode("error"));
                    return false;
                } else {
                    echo(json_encode(mysql_fetch_assoc($query2)));
                }
            }
        }
    }


    function editStudent ($data) {
        if ($data != null) {
            $id = $data -> id;
            $surname = $data -> surname;
            $name = $data -> name;
            $fname = $data -> fname;
            $specialityId = $data -> specialityId;
            $email = $data -> email;
            $password = $data -> password;

            $query = mysql_query("UPDATE users SET surname = '$surname', name = '$name', fname = '$fname', speciality_id = $specialityId, email = '$email', password = '$password' WHERE id = $id");
            if (!$query) {
                echo(json_encode(mysql_error()));
                return false;
            } else {
                $query2 = mysql_query("SELECT * FROM users WHERE id = $id");
                if (!$query2) {
                    echo(json_encode("error query2"));
                    return false;
                } else {
                    echo(json_encode(mysql_fetch_assoc($query2)));
                    return true;
                }
            }
        }
    }



    function deleteStudent ($data) {
        if ($data != null) {
            $id = $data -> id;

            $query = mysql_query("DELETE FROM users WHERE id = $id");
            if (!$query) {
                echo(json_encode(mysql_error()));
                return false;
            } else {
                $query2 = mysql_query("DELETE FROM results WHERE student_id = $id");
                if (!$query2) {
                    echo(json_encode(mysql_error()));
                    return false;
                } else {
                    echo(json_encode("success"));
                    return true;
                }
            }
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
                $article = new stdClass();
                $article -> article = $row;
                $article -> comments = array();
                $articleId = $row["id"];


                $comments = mysql_query("SELECT * FROM comments WHERE ARTICLE_ID = $articleId", $link);
                //if (!$comments)
                //    return json_encode("error");
                //else {
                    while ($comment = mysql_fetch_assoc($comments)) {
                        array_push($article -> comments, $comment);
                    }
                //}


                array_push($result, $article);
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



    function getTags () {
        global $link;
        $result = array();

        $query = mysql_query("SELECT * FROM tags", $link);
        if (!$query)
            return json_encode("error");
        else {
            while ($row = mysql_fetch_assoc($query)) {
                array_push($result, $row);
            }
            return json_encode($result);
        }
    }




    function getSpecialities () {
        global $link;
        $result = array();

        $query = mysql_query("SELECT * FROM specialities", $link);
        if (!$query) {
            echo(json_encode("error"));
            return false;
        } else {
            while ($row = mysql_fetch_assoc($query)) {
                array_push($result, $row);
            }
            return json_encode($result);
            return true;
        }
    }


    function addSpeciality ($data) {
        if ($data != null) {
            $title = $data -> title;
            $duration = intval($data -> duration);

            $query = mysql_query("INSERT INTO specialities (title, duration) VALUES ('$title', $duration)");
            if (!$query)
                return json_encode("error");
            else {
                $id = mysql_insert_id();
                $query2 = mysql_query("SELECT * FROM specialities WHERE id = $id");
                 if (!$query2)
                    return json_encode("error");
                 else {
                    echo(json_encode(mysql_fetch_assoc($query2)));
                 }
            }
        }
    }



    function editSpeciality ($data) {
        if ($data != null) {
            $id = $data -> id;
            $title = $data -> title;
            $duration = intval($data -> duration);

            $query = mysql_query("UPDATE specialities SET title = '$title', duration = $duration WHERE id = $id");
            if (!$query)
                return json_encode("error");
            else {
                $query2 = mysql_query("SELECT * FROM specialities WHERE id = $id");
                if (!$query2) {
                    echo(json_encode("error"));
                    return false;
                } else {
                    echo(json_encode(mysql_fetch_assoc($query2)));
                    return true;
                }
            }
        }
    }



    function deleteSpeciality ($data) {
        if ($data != null) {
            $id = $data -> id;
            $query = mysql_query("DELETE FROM specialities WHERE id = $id");
            if (!query) {
                echo(json_encode("error"));
                return false;
            } else {
                 $query2 = mysql_query("UPDATE users SET speciality_id = 0 WHERE speciality_id = $id");
                 if (!query) {
                     echo(json_encode("error"));
                     return false;
                 } else {
                     echo(json_encode("success"));
                     return true;
                 }
            }
        }
    }



    function addProfessor ($data) {
        if ($data != null) {
            $surname = $data -> surname;
            $name = $data -> name;
            $fname = $data -> fname;
            $email = $data -> email;
            $password = $data -> password;

            $query = mysql_query("INSERT INTO users (surname, name, fname, speciality_id, email, password, is_professor) VALUES ('$surname', '$name', '$fname', 0, '$email', '$password', 1)");
            if (!$query) {
                echo(json_encode("error"));
                return false;
            } else {
                $id = mysql_insert_id();
                $query2 = mysql_query("SELECT * FROM users WHERE id = $id");
                if (!$query2) {
                    echo(json_encode("error"));
                    return false;
                } else {
                    echo(json_encode(mysql_fetch_assoc($query2)));
                }
            }
        }
    }



    function editProfessor ($data) {
        if ($data != null) {
            $id = $data -> id;
            $surname = $data -> surname;
            $name = $data -> name;
            $fname = $data -> fname;
            $email = $data -> email;
            $password = $data -> password;

            $query = mysql_query("UPDATE users SET surname = '$surname', name = '$name', fname = '$fname', email = '$email', password = '$password' WHERE id = $id");
            if (!$query) {
                echo(json_encode(mysql_error()));
                return false;
            } else {
                $query2 = mysql_query("SELECT * FROM users WHERE id = $id");
                if (!$query2) {
                    echo(json_encode("error query2"));
                    return false;
                } else {
                    echo(json_encode(mysql_fetch_assoc($query2)));
                    return true;
                }
            }
        }
    }



    function deleteProfessor ($data) {
        if ($data != null) {
            $id = $data -> id;

            $query = mysql_query("DELETE FROM users WHERE id = $id");
            if (!$query) {
                echo(json_encode(mysql_error()));
                return false;
            } else {
                $query2 = mysql_query("UPDATE results SET professor_id = 0 WHERE professor_id = $id");
                if (!$query2) {
                    echo(json_encode(mysql_error()));
                    return false;
                } else {
                    echo(json_encode("success"));
                    return true;
                }
            }
        }
    }



    function addDiscipline ($data) {
        if ($data != null) {
            $title = $data -> title;
            $professorId = $data -> professorId;

            $query = mysql_query("INSERT INTO disciplines (title, professor_id) VALUES ('$title', $professorId)");
            if (!$query) {
                    echo(json_encode("error"));
                    return false;
            } else {
                $id = mysql_insert_id();
                $query2 = mysql_query("SELECT * FROM disciplines WHERE id = $id");
                if (!$query2) {
                    echo(json_encode("error"));
                    return false;
                } else {
                    echo(json_encode(mysql_fetch_assoc($query2)));
                }
            }
        }
    }



    function editDiscipline ($data) {
        if ($data != null) {
            $id = $data -> id;
            $title = $data -> title;

            $query = mysql_query("UPDATE disciplines SET title = '$title' WHERE id = $id");
            if (!$query) {
                echo(json_encode(mysql_error()));
                return false;
            } else {
                $query2 = mysql_query("SELECT * FROM disciplines WHERE id = $id");
                if (!$query2) {
                    echo(json_encode("error query2"));
                    return false;
                } else {
                    echo(json_encode(mysql_fetch_assoc($query2)));
                    return true;
                }
            }
        }
    }



    function deleteDiscipline ($data) {
        if ($data != null) {
            $id = $data -> id;

            $query = mysql_query("DELETE FROM disciplines WHERE id = $id");
            if (!$query) {
                echo(json_encode(mysql_error()));
                return false;
            } else {
                $query2 = mysql_query("DELETE FROM results WHERE discipline_id = $id");
                if (!$query2) {
                    echo(json_encode(mysql_error()));
                    return false;
                } else {
                    echo(json_encode("success"));
                    return true;
                }
            }
        }
    }



    function addArticle ($data) {
        if ($data != null) {
            $articleId = $data -> articleId;
            $title = $data -> title;
            $preview = $data -> preview;
            $content = $data -> content;
            $userId = $data -> userId;
            $tags = $data -> tags;
            $timestamp = time();

            if ($articleId == 0) {
                $query = mysql_query("INSERT INTO news (title, preview, content, user_id, image, tags, timestamp) VALUES ('$title', '$preview', '$content', $userId, '', '$tags', $timestamp)");
                if (!$query) {
                    echo(json_encode("error"));
                    return false;
                } else {
                    $id = mysql_insert_id();
                    $query2 = mysql_query("SELECT * FROM news WHERE id = $id");
                    if (!$query2) {
                        echo(json_encode("error"));
                        return false;
                    } else {
                        echo(json_encode(mysql_fetch_assoc($query2)));
                    }
                 }
            } else {
                $query = mysql_query("UPDATE news SET user_id = $userId, title = '$title', preview = '$preview', content = '$content', tags = '$tags' WHERE id = $articleId");
                if (!$query) {
                    echo(json_encode("error"));
                    return false;
                }

                $query = mysql_query("SELECT * FROM news WHERE id = $articleId");
                if (!$query) {
                    echo(json_encode("error"));
                    return false;
                }

                echo(json_encode(mysql_fetch_assoc($query)));
                return true;
            }
        }
    }




    function editArticle ($data) {
        if ($data != null) {
            global $link;
            $id = $data -> id;
            $title = $data -> title;
            $preview = $data -> preview;
            $content = mysql_real_escape_string($data -> content, $link);
            $tags = $data -> tags;


            $query = mysql_query("UPDATE news SET title = '$title', preview = '$preview', content = '$content', tags = '$tags' WHERE id = $id");
            if (!$query) {
                echo(json_encode(mysql_error()));
                return false;
            } else {
                $query2 = mysql_query("SELECT * FROM news WHERE id = $id");
                if (!$query2) {
                    echo(json_encode("error query2"));
                    return false;
                } else {
                    echo(json_encode(mysql_fetch_assoc($query2)));
                    return true;
                }
            }
        }
    }



    function deleteArticle ($data) {
        if ($data != null) {
            $id = $data -> id;

            $query = mysql_query("DELETE FROM news WHERE id = $id");
            if (!$query) {
                echo(json_encode(mysql_error()));
                return false;
            } else {
                echo(json_encode("success"));
                return true;
            }
        }
     }


    function addResult($data) {
        if ($data != null) {
             $disciplineId = $data -> disciplineId;
             $studentId = $data -> studentId;
             $professorId = $data -> professorId;
             $value = $data -> value;
             $timestamp = time();

             $query = mysql_query("INSERT INTO results (discipline_id, student_id, professor_id, value, timestamp) VALUES ($disciplineId, $studentId, $professorId, $value, $timestamp)");
             if (!$query) {
                 echo(json_encode("error"));
                 return false;
             } else {
                 $id = mysql_insert_id();
                 $query2 = mysql_query("SELECT * FROM results WHERE id = $id");
                 if (!$query2) {
                     echo(json_encode("error"));
                     return false;
                 } else {
                     echo(json_encode(mysql_fetch_assoc($query2)));
                 }
             }
        }
    }




    function editResult ($data) {
        if ($data != null) {
            $id = $data -> id;
            $disciplineId = $data -> disciplineId;
            $studentId = $data -> studentId;
            $value = $data -> value;

            $query = mysql_query("UPDATE results SET discipline_id = $disciplineId, student_id = $studentId, value = $value WHERE id = $id");
            if (!$query) {
                echo(json_encode(mysql_error()));
                return false;
            } else {
                $query2 = mysql_query("SELECT * FROM results WHERE id = $id");
                if (!$query2) {
                    echo(json_encode("error query2"));
                    return false;
                } else {
                    echo(json_encode(mysql_fetch_assoc($query2)));
                    return true;
                }
            }
        }
    }





    function addComment ($data) {
        if ($data != null) {
            $articleId = $data -> articleId;
            $userId = $data -> userId;
            $content = $data -> content;
            $added = time();


            $query = mysql_query("INSERT INTO comments (article_id, user_id, content, added) VALUES ($articleId, $userId, '$content', $added)");
            if (!$query) {
                echo(json_encode("error"));
                return false;
            } else {
                $id = mysql_insert_id();
                $query2 = mysql_query("SELECT * FROM comments WHERE id = $id");
                if (!$query2) {
                    echo(json_encode("error"));
                    return false;
                } else {
                    echo(json_encode(mysql_fetch_assoc($query2)));
                }
            }
        }
    }


    function getAlbums () {
        global $link;
        $result = array();

        $query = mysql_query("SELECT * FROM albums", $link);
        if (!$query) {
            echo(json_encode("error"));
            return false;
        } else {
            while ($row = mysql_fetch_assoc($query)) {
                $album = new stdClass();
                $album -> album = $row;
                $album -> photos = array();
                $albumId = $row["ID"];
                $photos = mysql_query("SELECT * FROM photos WHERE album_id = $albumId", $link);
                if (!$photos) {
                    //echo(json_encode("error"));
                    //return false;
                } else {
                    while ($photo = mysql_fetch_assoc($photos)) {
                        array_push($album -> photos, $photo);
                    }
                }
                array_push($result, $album);
            }
            return json_encode($result);
            return true;
        }
    }


    function addAlbum ($data) {
        if ($data != null) {
            $userId = $data -> userId;
            $title = $data -> title;
            $added = time();

            $query = mysql_query("INSERT INTO albums (user_id, title, added) VALUES ($userId, '$title', $added)");
            if (!$query) {
                echo(json_encode("error"));
                return false;
            } else {
                $id = mysql_insert_id();
                $query2 = mysql_query("SELECT * FROM albums WHERE id = $id");
                if (!$query2) {
                    echo(json_encode("error"));
                    return false;
                } else {
                    echo(json_encode(mysql_fetch_assoc($query2)));
                }
            }
        }
    }



    function getEvents () {
        global $link;
        $result = array();

        $query = mysql_query("SELECT * FROM events", $link);
        if (!$query) {
            echo(json_encode("error"));
            return false;
        } else {
            while ($row = mysql_fetch_assoc($query)) {
                array_push($result, $row);
            }
            return json_encode($result);
            return true;
        }
    }



    function addEvent ($data) {
        if ($data != null) {
            $userId = $data -> userId;
            $title = $data -> title;
            $content = $data -> content;
            $date = $data -> date;
            $participants = $data -> participants;
            $added = time();

            $query = mysql_query("INSERT INTO events (user_id, title, content, timestamp, participants, added) VALUES ($userId, '$title', '$content', $date, '$participants', $added)");
            if (!$query) {
                echo(json_encode("error"));
                return false;
            } else {
                $id = mysql_insert_id();
                $query2 = mysql_query("SELECT * FROM events WHERE id = $id");
                if (!$query2) {
                    echo(json_encode("error"));
                    return false;
                } else {
                    echo(json_encode(mysql_fetch_assoc($query2)));
                }
            }
        }
    }



    function OAuthUser ($network, $identity, $name, $surname) {
        $net = "";
        $idn = mysql_real_escape_string($identity);
        switch ($network) {
            case "vkontakte":
                $net = "vkontakte_uid";
                break;
            case "odnoklassniki":
                $net = "odnoklassniki_uid";
                break;
            case "mailru":
                $net = "mailru_uid";
                break;
            case "facebook":
                $net = "facebook_uid";
                break;
        }

        $query = mysql_query("SELECT * FROM users WHERE ".$net." = '$idn'");
        if (!$query) {
            echo(json_encode(false));
            return false;
        }
        if ($query && mysql_num_rows($query) == 0) {
            //echo("no user found<br>");
            $userQuery = mysql_query("INSERT INTO users (surname, name, fname, email, is_professor, password, speciality_id, $net) VALUES ('$surname', '$name', ' ', ' ', 0, ' ', 0, '$idn')");
            if (!$userQuery) {
                echo(json_encode(false));
                return false;
            } else {
                //echo("user added<br>");
                $userId = mysql_insert_id();
                $user = mysql_query("SELECT * FROM users WHERE ID = $userId");
                if (!$user) {
                    echo(json_encode("error"));
                    return false;
                } else {
                    $result = mysql_fetch_assoc($user);
                    setcookie("user_id", $result["id"]);
                    //echo(json_encode($result));
                    return true;
                }
            }
        } else {
            $user = mysql_query("SELECT * FROM users WHERE ".$net." = '$idn'");
            if (!$user) {
                echo(json_encode("error"));
                return false;
            } else {
                $result = mysql_fetch_assoc($user);
                setcookie("user_id", $result["id"]);
                //echo(json_encode($result));
                return true;
            }
        }
    }

?>