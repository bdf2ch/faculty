"use strict";



function Menu (parameters) {
    this.title = "";
    this.url = "";
    this.active = false;

    if (parameters !== undefined) {
        for (var param in parameters) {
            if (this.hasOwnProperty(param))
                this[param] = parameters[param];
        }
    }
};



function Speciality (parameters) {
    this.id = 0;
    this.title = "";
    this.duration = 0;
    this.editing = false;
    this.deleting = false;
    this.changed = false;
    this.backup = {};
    this.errors = [];

    if (parameters !== undefined) {
        for (var param in parameters) {
            if (this.hasOwnProperty(param)) {
                this[param] = parameters[param];
                this.backup[param] = parameters[param];
            }
        }
    }

    this.fromSource = function (data) {
        if (data !== undefined) {
            for (var field in data) {
                switch (field) {
                    case "id":
                        this.id = parseInt(data[field]);
                        this.backup.id = parseInt(data[field]);
                        break;
                    case "title":
                        this.title = data[field];
                        this.backup.title = data[field];
                        break;
                    case "duration":
                        this.duration = parseInt(data[field]);
                        this.backup.duration = parseInt(data[field]);
                        break;
                }
            }
        }
    };

    this.cancel = function () {
        for (var param in this.backup) {
            if (this.hasOwnProperty(param)) {
                this[param] = this.backup[param];
            }
        }
        this.editing = false;
        this.deleting = false;
        this.changed = false;
    };

    this.validate = function () {
        this.errors = [];
        if (this.title === "")
            this.errors["title"] = "Вы не указали наименование специальности";
        if (this.duration === "" || this.duration === 0 || this.duration < 0)
            this.errors["duration"] = "Вы не указали срок обучения";
        return Object.keys(this.errors).length;
    };
};



function Article (parameters) {
    this.id = 0;
    this.userId = 0;
    this.title = "";
    this.preview = "";
    this.content = "";
    this.image = "";
    this.timestamp = 0;
    this.editing = false;
    this.deleting = false;
    this.changed = false;
    this.tags = [];
    this.comments = [];
    this.backup = {};
    this.errors = [];

    this.fromSource = function (data) {
        if (data !== undefined) {
            for (var field in data) {
                switch (field) {
                    case "id":
                        this.id = parseInt(data[field]);
                        this.backup.id = parseInt(data[field]);
                        break;
                    case "user_id":
                        this.userId = parseInt(data[field]);
                        this.backup.userId = parseInt(data[field]);
                        break;
                    case "title":
                        this.title = data[field];
                        this.backup.title = data[field];
                        break;
                    case "preview":
                        this.preview = data[field];
                        this.backup.preview = data[field];
                        break;
                    case "content":
                        this.content = data[field];
                        this.backup.content = data[field];
                        break;
                    case "image":
                        this.image = data[field];
                        this.backup.image = data[field];
                        break;
                    case "timestamp":
                        this.timestamp = new moment.unix(parseInt(data[field]));
                        this.backup.timestamp = new moment.unix(parseInt(data[field]));
                        break;
                    case "tags":
                        if (data[field] !== "") {
                            var tags = data[field].split(";");
                            var length = tags.length;
                            for (var i = 0; i < length; i++) {
                                var tag = new Tag();
                                tag.title = tags[i];
                                this.tags.push(tag);
                            }
                            this.backup.tags = this.tags;
                        }
                        break;
                    case "comments":
                        var length = data[field].length;
                        for (var i = 0; i < length; i++) {
                            var comment = new Comment();
                            comment.fromSource(data[field][i]);
                            this.comments.push(comment);
                        }
                        break;
                }
            }
        }
    };

    if (parameters !== undefined) {
        for (var param in parameters) {
            if (this.hasOwnProperty(param)) {
                this[param] = parameters[param];
                this.backup[param] = parameters[param];
            }
        }
    }

    this.cancel = function () {
        for (var param in this.backup) {
            if (this.hasOwnProperty(param)) {
                this[param] = this.backup[param];
            }
        }
        this.editing = false;
        this.deleting = false;
        this.changed = false;
    };

    this.validate = function () {
        this.errors = [];
        if (this.title === "")
            this.errors["title"] = "Вы не указали заголовок новости";
        if (this.preview === "")
            this.errors["preview"] = "Вы не указали краткое описание новости";
        if (this.content === "")
            this.errors["content"] = "Вы не указали содержание новости новости";
        return Object.keys(this.errors).length;
    };

    this.deleteTag = function (tag) {
        if (tag !== undefined) {
            var length = this.tags.length;
            for (var i = 0; i < length; i++) {
                if (this.tags[i].title === tag) {
                    this.tags.splice(i, 1);
                    this.changed = true;
                }
            }
        }
    };

    this.joinTags = function () {
        var length = this.tags.length;
        var tags = "";
        for (var i = 0; i < length; i++) {
            tags += this.tags[i].title;
            tags += i < length - 1 ? ";" : "";
        }
        return tags;
    };


    this.addComment = function (comment) {
        if (comment !== undefined) {
            this.comments.push(comment);
            return true;
        }
        return false;
    };
};



function Comment (parameters) {
    this.id = 0;
    this.articleId = 0;
    this.userId = 0;
    this.content = "";
    this.added = 0;
    this.backup = {};
    this.erorrs = [];

    if (parameters !== undefined) {
        for (var param in parameters) {
            if (this.hasOwnProperty(param)) {
                this[param] = parameters[param];
                this.backup[param] = parameters[param];
            }
        }
    }

    this.fromSource = function (data) {
        if (data !== undefined) {
            for (var field in data) {
                switch (field) {
                    case "ID":
                        this.id = parseInt(data[field]);
                        this.backup.id = parseInt(data[field]);
                        break;
                    case "ARTICLE_ID":
                        this.articleId = parseInt(data[field]);
                        this.backup.articleId = parseInt(data[field]);
                        break;
                    case "USER_ID":
                        this.userId = parseInt(data[field]);
                        this.backup.userId = parseInt(data[field]);
                        break;
                    case "CONTENT":
                        this.content = data[field];
                        this.backup.content = data[field];
                        break;
                    case "ADDED":
                        this.added = new moment.unix(parseInt(data[field]));
                        break;
                }
            }
        }
    };

    this.validate = function () {
        this.errors = [];
        if(this.content === "")
            this.errors["content"] = "Вы не указали содержание комментария";
        return Object.keys(this.errors).length;
    };
};



function PhotoAlbum (parameters) {
    this.id = 0;
    this.userId = 0;
    this.title = "";
    this.added = 0;
    this.photos = [];
    this.errors = [];
    this.backup = {};

    if (parameters !== undefined) {
        for (var param in parameters) {
            if (this.hasOwnProperty(param)) {
                this[param] = parameters[param];
                this.backup[param] = parameters[param];
            }
        }
    }

    this.validate = function () {
        this.errors = [];
        if (this.title === "")
            this.errors["title"] = "Вы не указали наименование альбома";
        return Object.keys(this.errors).length;
    };

    this.fromSource = function (data) {
        if (data !== undefined) {
            for (var field in data) {
                switch (field) {
                    case "ID":
                        this.id = parseInt(data[field]);
                        this.backup.id = parseInt(data[field]);
                        break;
                    case "USER_ID":
                        this.userId = parseInt(data[field]);
                        this.backup.userId = parseInt(data[field]);
                        break;
                    case "TITLE":
                        this.title = data[field];
                        this.backup.title = data[field];
                        break;
                    case "ADDED":
                        this.added = new moment.unix(parseInt(data[field]));
                        break;
                }
            }
        }
    };
};


function Photo (parameters) {
    this.id = 0;
    this.albumId = 0;
    this.userId = 0;
    this.size = 0;
    this.url = "";

    if (parameters !== undefined) {
        for (var param in parameters) {
            if (this.hasOwnProperty(param)) {
                this[param] = parameters[param];
                this.backup[param] = parameters[param];
            }
        }
    }

    this.fromSource = function (data) {
        if (data !== undefined) {
            for (var field in data) {
                switch (field) {
                    case "ID":
                        this.id = parseInt(data[field]);
                        break;
                    case "ALBUM_ID":
                        this.albumId = parseInt(data[field]);
                        break;
                    case "USER_ID":
                        this.userId = parseInt(data[field]);
                        break;
                    case "URL":
                        this.url = data[field];
                        break;
                    case "ADDED":
                        this.added = new moment.unix(parseInt(data[field]));
                        break;
                }
            }
        }
    };
};



function Tag (parameters) {
    this.id = 0;
    this.title = "";
    this.isSelected = false;
    this.backup = {};

    if (parameters !== undefined) {
        for (var param in parameters) {
            if (this.hasOwnProperty(param)) {
                this[param] = parameters[param];
                this.backup[param] = parameters[param];
            }
        }
    }

    this.validate = function () {
        this.errors = [];
        if (this.title === "")
            this.errors["title"] = "Вы не указали наименование тега";
        return Object.keys(this.errors).length;
    };

    this.fromSource = function (data) {
        if (data !== undefined) {
            for (var field in data) {
                switch (field) {
                    case "ID":
                        this.id = parseInt(data[field]);
                        this.backup.id = parseInt(data[field]);
                        break;
                    case "TITLE":
                        this.title = data[field];
                        this.backup.title = data[field];
                        break;
                }
            }
        }
    };
};



function User (parameters) {
    this.id = 0;
    this.specialityId = 0;
    this.surname = "";
    this.name = "";
    this.fname = "";
    this.email = "";
    this.password = "";
    this.isProfessor = false;
    this.fio = "";
    this.editing = false;
    this.deleting = false;
    this.changed = false;
    this.backup = {};
    this.errors = [];

    if (parameters !== undefined) {
        for (var param in parameters) {
            if (this.hasOwnProperty(param)) {
                this[param] = parameters[param];
                this.backup[param] = parameters[param];
            }
        }
    }

    this.fromSource = function (data) {
        if (data !== undefined) {
            for (var field in data) {
                switch (field) {
                    case "id":
                        this.id = parseInt(data[field]);
                        this.backup.id = parseInt(data[field]);
                        break;
                    case "speciality_id":
                        this.specialityId = parseInt(data[field]);
                        this.backup.specialityId = parseInt(data[field]);
                        break;
                    case "surname":
                        this.surname = data[field];
                        this.backup.surname = data[field];
                        break;
                    case "name":
                        this.name = data[field];
                        this.backup.name = data[field];
                        break;
                    case "fname":
                        this.fname = data[field];
                        this.backup.fname = data[field];
                        break;
                    case "email":
                        this.email = data[field];
                        this.backup.email = data[field];
                        break;
                    case "password":
                        this.password = data[field];
                        this.backup.password = data[field];
                        break;
                    case "is_professor":
                        this.isProfessor = parseInt(data[field]) === 1 ? true : false;
                        this.backup.isProfessor = parseInt(data[field]) === 1 ? true : false;
                        break;
                }
            }
        }
        this.fio = this.surname + " " + this.name + " " + this.fname;
    };

    this.cancel = function () {
        for (var param in this.backup) {
            if (this.hasOwnProperty(param)) {
                this[param] = this.backup[param];
            }
        }
        this.editing = false;
        this.deleting = false;
        this.changed = false;
    };

    this.validate = function () {
        this.errors = [];
        if (this.surname === "")
            this.errors["surname"] = "Вы не указали фамилию";
        if (this.name === "")
            this.errors["name"] = "Вы не указали имя";
        if (this.fname === "")
            this.errors["fname"] = "Вы не указали отчество";
        if (this.email === "")
            this.errors["email"] = "Вы не указали email";
        if (this.specialityId === 0)
            this.errors["specialityId"] = "Вы не указали специальность";
        if (this.password === "")
            this.errors["password"] = "Вы не указали пароль";
        return Object.keys(this.errors).length;
    };
};



function Discipline (parameters) {
    this.id = 0;
    this.title = "";
    this.professorId = 0;
    this.editing = false;
    this.deleting = false;
    this.changed = false;
    this.backup = {};
    this.errors = [];

    if (parameters !== undefined) {
        for (var param in parameters) {
            if (this.hasOwnProperty(param)) {
                this[param] = parameters[param];
                this.backup[param] = parameters[param];
            }
        }
    }

    this.fromSource = function (data) {
        if (data !== undefined) {
            for (var field in data) {
                switch (field) {
                    case "id":
                        this.id = parseInt(data[field]);
                        this.backup.id = parseInt(data[field]);
                        break;
                    case "professor_id":
                        this.professorId = parseInt(data[field]);
                        this.backup.professorId = parseInt(data[field]);
                        break;
                    case "title":
                        this.title = data[field];
                        this.backup.title = data[field];
                        break;
                }
            }
        }
    };

    this.cancel = function () {
        for (var param in this.backup) {
            if (this.hasOwnProperty(param)) {
                this[param] = this.backup[param];
            }
        }
        this.editing = false;
        this.deleting = false;
        this.changed = false;
    };

    this.validate = function () {
        this.errors = [];
        if (this.title === "")
            this.errors["title"] = "Вы не указали наименование дисциплины";
        if (this.professorId === 0)
            this.errors["professorId"] = "Вы не указали преподавателя";
        return Object.keys(this.errors).length;
    };
};



function Result (parameters) {
    this.id = 0;
    this.studentId = 0;
    this.professorId = 0;
    this.disciplineId = 0;
    this.value = 0;
    this.timestamp = 0;
    this.editing = false;
    this.deleting = false;
    this.changed = false;
    this.backup = {};
    this.errors = [];

    if (parameters !== undefined) {
        for (var param in parameters) {
            if (this.hasOwnProperty(param)) {
                this[param] = parameters[param];
                this.backup[param] = parameters[param];
            }
        }
    }

    this.fromSource = function (data) {
        if (data !== undefined) {
            for (var field in data) {
                switch (field) {
                    case "id":
                        this.id = parseInt(data[field]);
                        this.backup.id = parseInt(data[field]);
                        break;
                    case "student_id":
                        this.studentId = parseInt(data[field]);
                        this.backup.studentId = parseInt(data[field]);
                        break;
                    case "professor_id":
                        this.professorId = parseInt(data[field]);
                        this.backup.professorId = parseInt(data[field]);
                        break;
                    case "discipline_id":
                        this.disciplineId = parseInt(data[field]);
                        this.backup.disciplineId = parseInt(data[field]);
                        break;
                    case "value":
                        this.value = parseInt(data[field]);
                        this.backup.value = parseInt(data[field]);
                        break;
                    case "timestamp":
                        this.timestamp = new moment.unix(parseInt(data[field]));
                        this.backup.timestamp = parseInt(data[field]);
                        break;
                }
            }
        }
    };

    this.cancel = function () {
        for (var param in this.backup) {
            if (this.hasOwnProperty(param)) {
                if (param !== "timestamp")
                    this[param] = this.backup[param];
            }
        }
        this.editing = false;
        this.deleting = false;
        this.changed = false;
    };

    this.validate = function () {
        this.errors = [];
        if (this.studentId === 0)
            this.errors["studentId"] = "Вы не выбрали студента";
        if (this.disciplineId === 0)
            this.errors["disciplineId"] = "Вы не выбрали дисциплину";
        if (this.value === 0)
            this.errors["value"] = "Вы не выбрали оценку";
        return Object.keys(this.errors).length;
    };
};


function UserEvent () {
    this.id = 0;
    this.userId = 0;
    this.title = "";
    this.content = "";
    this.participants = "";
    this.users = [];
    this.date = 0;
    this.added = 0;
    this.errors = [];

    this.fromSource = function (data) {
        if (data !== undefined) {
            for (var field in data) {
                switch (field) {
                    case "ID":
                        this.id = parseInt(data[field]);
                        break;
                    case "USER_ID":
                        this.userId = parseInt(data[field]);
                        break;
                    case "TITLE":
                        this.title = data[field];
                        break;
                    case "CONTENT":
                        this.content = data[field];
                        break;
                    case "PARTICIPANTS":
                        this.participants = data[field];
                        break;
                    case "TIMESTAMP":
                        this.date = new moment.unix(parseInt(data[field]));
                        break;
                    case "ADDED":
                        this.added = new moment.unix(parseInt(data[field]));
                        break;
                }
            }
        }
    };

    this.joinParticipants = function () {
        if (this.users.length > 0) {
            var result = "";
            var length = this.users.length;
            for (var i = 0; i < length; i++) {
                result += this.users[i].id.toString();
                result += i < length - 1 ? ";" : "";
            }
            console.log("joined = ", result);
            return result;
        }
    };
};



angular
    .module("app", ["ngRoute", "ngCookies"])
    .config(function ($routeProvider, $httpProvider) {

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};


        $routeProvider
            .when("/", {
                templateUrl: "templates/news.html",
                controller: "NewsController"
            })
            .when("/login", {
                templateUrl: "templates/login.html",
                controller: "LoginController"
            })
            //.when("/news", {
            //    templateUrl: "templates/news.html",
            //    controller: "NewsController"
            //})
            //.when("/news", {
            //    templateUrl: "templates/news.html",
            //    controller: "NewsController"
            //})
            .when("/news/:articleId", {
                templateUrl: "templates/article.html",
                controller: "ArticleController"
            })
            .when("/add-article", {
                templateUrl: "templates/new-article.html",
                controller: "NewArticleController"
            })
            .when("/edit-article", {
                templateUrl: "templates/edit-article.html",
                controller: "EditArticleController"
            })
            .when("/specialities", {
                templateUrl: "templates/specialities.html",
                controller: "SpecialitiesController"
            })
            .when("/professors", {
                templateUrl: "templates/professors.html",
                controller: "ProfessorsController"
            })
            .when("/new-professor", {
                templateUrl: "templates/new-professor.html",
                controller: "NewProfessorController"
            })
            .when("/edit-professor", {
                templateUrl: "templates/edit-professor.html",
                controller: "EditProfessorController"
            })
            .when("/students", {
                templateUrl: "templates/students.html",
                controller: "StudentsController"
            })
            .when("/new-student", {
                templateUrl: "templates/new-student.html",
                controller: "NewStudentController"
            })
            .when("/edit-student", {
                templateUrl: "templates/edit-student.html",
                controller: "EditStudentController"
            })
            .when("/results", {
                templateUrl: "templates/results.html",
                controller: "ResultsController"
            })
            .when("/new-result", {
                templateUrl: "templates/new-result.html",
                controller: "NewResultController"
            })
            .when("/disciplines", {
                templateUrl: "templates/disciplines.html",
                controller: "DisciplinesController"
            })
            .when("/albums", {
                templateUrl: "templates/albums.html",
                controller: "AlbumsController"
            })
            .when("/photoalbum/:albumId", {
                templateUrl: "templates/album.html",
                controller: "AlbumController"
            })
            .when("/new-event", {
                templateUrl: "templates/new-event.html",
                controller: "NewEventController"
            })
            .when("/events/:eventId", {
                templateUrl: "templates/event.html",
                controller: "EventController"
            })
            .otherwise({
                redirectTo: "/"
            })
    })
    .factory("$application", ApplicationFactory)
    .controller("NewsController", NewsController)
    .controller("SpecialitiesController", SpecialitiesController)
    .controller("ProfessorsController", ProfessorsController)
    .controller("StudentsController", StudentsController)
    .controller("DisciplinesController", DisciplinesController)
    .filter("students", StudentsFilter)
    .filter("professors", ProfessorsFilter)
    .filter("professorId", ProfessorIdFilter)
    .filter("tags", tagsFilter)
    .filter("participants", participantsFilter)
    .directive("uploader", ["$log", "$http", function ($log, $http) {
        return {
            restrict: "A",
            scope: {
                //uploaderUrl: "=",
                uploaderData: "=",
                uploaderOnCompleteUpload: "=",
                uploaderOnBeforeUpload: "="
            },
            link: function (scope, element, attrs) {
                var url = "";
                var fd = new FormData();

                if (attrs.uploaderUrl === undefined || attrs.uploaderUrl === "") {
                    $log.log("uploader -> Не задан атрибут - url");
                    return false;
                }

                attrs.$observe("uploaderUrl", function (val) {
                    url = val;
                    $log.log("interpolated url = ", url);

                });

                /**
                 * Отслеживаем выбор файла для загрузки
                 */
                element.bind("change", function () {
                    //var fd = new FormData();
                    angular.forEach(element[0].files, function (file) {
                        $log.log(file);
                        fd.append("file", file);
                    });

                    /* Если задан коллбэк onBeforeUpload - выполняем его */
                    $log.log(scope.uploaderOnBeforeUpload);
                    if (scope.uploaderOnBeforeUpload !== undefined && typeof scope.uploaderOnBeforeUpload === "function") {
                        scope.$apply(scope.uploaderOnBeforeUpload);
                    }

                    /* Если заданы данные для отправки на сервер - добавляем их в данные формы для отправки */
                    if (scope.uploaderData !== undefined) {
                        $log.info(scope.uploaderData);
                        for (var param in scope.uploaderData) {
                            fd.append(param, scope.uploaderData[param]);
                        }
                    }

                    scope.upload();
                });

                /**
                 * Отправляет данные на сервер
                 */
                scope.upload = function () {

                    $log.info("upload, link = ", url);
                    if (fd.has("file")) {
                        element.prop("disabled", "disabled");
                        $http.post(url, fd,
                            {
                                transformRequest: angular.identity,
                                headers: {
                                    "Content-Type": undefined
                                }
                            }
                        ).success(function (data) {
                            $log.log(data);
                            element.prop("disabled", "");
                            if (scope.uploaderOnCompleteUpload !== undefined && typeof scope.uploaderOnCompleteUpload === "function")
                                scope.uploaderOnCompleteUpload(data);
                            fd.delete("file");
                            fd = new FormData();
                        });
                    }
                };

            }
        }
    }])
    .run(runFunction);



function ApplicationFactory ($cookies, $location, $http) {
    var menu = [
        new Menu ({ url: "#/news", title: "Новости" }),
        new Menu ({ url: "#/specialities", title: "Специальности" }),
        new Menu ({ url: "#/disciplines", title: "Дисциплины" }),
        new Menu ({ url: "#/professors", title: "Педагогический коллектив" }),
        new Menu ({ url: "#/students", title: "Студенты" }),
        new Menu ({ url: "#/results", title: "Результаты экзаменов" }),
        new Menu ({ url: "#/albums", title: "Фотоальбомы" })
    ];

    var users = [];
    var specialities = [];
    var disciplines = [];
    var results = [];
    var news = [];
    var tags = [];
    var albums = [];
    var events = [];
    var currentUser = undefined;
    var sessionUser = undefined;
    var currentArticle = undefined;
    var marks = [
        { title: "Неудовлетворительно", value: 2 },
        { title: "Удовлетворительно", value: 3 },
        { title: "Хорошо", value: 4 },
        { title: "Отлично", value: 5 }
    ];

    var currentArticle = undefined;

    var api = {
        logout: function () {
            delete $cookies.user_id;
            sessionUser = undefined;
            $location.url("/news");
        },
        getMarks: function () {
            return marks;
        },
        getMark: function (value) {
            if (value !== undefined) {
                var length = marks.length;
                for (var i = 0; i < length; i++) {
                    if (marks[i].value === value)
                        return marks[i].value + " (" + marks[i].title + ")";
                }
            }
        },
        getResults: function () {
            return results;
        },
        addResult: function (result) {
            if (result !== undefined) {
                results.push(result);
            }
        },
        setSessionUser: function (id) {
            if (id !== undefined) {
                var length = users.length;
                for (var i = 0; i < length; i++) {
                    if (users[i].id === id)
                        sessionUser = users[i];
                }
            }
        },
        getSessionUser: function () {
            return sessionUser;
        },
        getCurrentUser: function () {
            return currentUser;
        },
        setCurrentUser: function (user) {
            if (user !== undefined)
                currentUser = user;
        },
        getMenu: function () {
            return menu;
        },
        activeMenu: function (url) {
            if (url !== undefined) {
                var length = menu.length;
                for (var i = 0; i < length; i++) {
                    if (menu[i].url === url)
                        menu[i].active = true;
                    else 
                        menu[i].active = false;
                }
            }
        },
        getUsers: function () {
            return users;
        },
        addUser: function (user) {
            if (user !== undefined) {
                users.push(user);
            }
        },
        getUserById: function (id) {
            if (id !== undefined) {
                var length = users.length;
                for (var i = 0; i < length; i++) {
                    if (users[i].id === id)
                        return users[i];
                }
                return false;
            }
        },
        getSpecialities: function () {
            return specialities;
        },
        getSpecialityById: function (id) {
            if (id !== undefined) {
                var length = this.getSpecialities().length;
                for (var i = 0; i < length; i++) {
                    if (this.getSpecialities()[i].id === id) {
                        return this.getSpecialities()[i];
                    }    
                }
            }
        },
        addSpeciality: function (speciality) {
            if (speciality !== undefined)
                specialities.push(speciality);
        },
        getDisciplines: function () {
            return disciplines;
        },
        getDisciplineById: function (id) {
            if (id !== undefined) {
                var length = disciplines.length;
                for (var i = 0; i < length; i ++) {
                    if (disciplines[i].id === id)
                        return disciplines[i];
                }
            }
        },
        addDiscipline: function (discipline) {
            if (discipline !== undefined)
                disciplines.push(discipline);
        },
        getNews: function () {
            return news;
        },
        setCurrentArticle: function (article) {
            if (article !== undefined) {
                currentArticle = article;
            }
        },
        getCurrentArticle: function () {
            return currentArticle;
        },
        addArticle: function (article) {
            if (article !== undefined)
                news.push(article);
        },
        getTags: function () {
            return tags;
        },

        getTag: function (tag) {
            if (tag !== undefined) {
                var length = tags.length;
                for (var i = 0; i < length; i++) {
                    if (tags[i].title === tag)
                        return true;
                }
                return false;
            }
        },


        addTag: function (tag) {
            if (tag !== undefined)
                tags.push(tag);
        },

        selectTag: function (tag) {
            if (tag !== undefined) {
                var length = tags.length;
                for (var i = 0; i < length; i++) {
                    if (tags[i].title === tag) {
                        if (tags[i].isSelected === false) {
                            tags[i].isSelected = true;
                        } else {
                            tags[i].isSelected = false;
                        }
                    }
                }
            }
        },

        getSelectedTags: function () {
            var result = [];
            var length = tags.length;
            for (var i = 0; i < length; i++) {
                if (tags[i].isSelected === true)
                    result.push(tags[i]);
            }
            return result;
        },


        tags: {
            getByTitle: function (title) {
                if (title !== undefined) {
                    var length = tags.length;
                    for (var i = 0; i < length; i++) {
                        if (tags[i].title === title)
                            return tags[i];
                    }
                    return false;
                }
            },

            add: function (tag) {
                if (tag !== undefined) {
                    tags.push(tag);
                    return true;
                }
                return false;
            }
        },


        comments: {
            add: function (comment, callback) {
                if (comment !== undefined) {
                    var params = {
                        action: "addComment",
                        data: {
                            articleId: comment.articleId,
                            userId: comment.userId,
                            content: comment.content
                        }
                    };
                    $http.post("/serverside/api.php", params)
                        .success(function (data) {
                            if (data !== undefined) {
                                var comment = new Comment();
                                comment.fromSource(data);
                                //if (currentArticle !== undefined) {
                                //    currentArticle.comments.push(comment);
                                    if (callback !== undefined && typeof callback === "function")
                                        callback(comment);
                                    return true;
                                //}
                            }
                        });
                }
            }
        },

        albums: {
            getAll: function () {
                return albums;
            },

            add: function (album, callback) {
                if (album !== undefined) {
                    var params = {
                        action: "addAlbum",
                        data: {
                            userId: album.userId,
                            title: album.title
                        }
                    };
                    $http.post("/serverside/api.php", params)
                        .success(function (data) {
                            if (data !== undefined) {
                                var album = new PhotoAlbum();
                                album.fromSource(data);
                                albums.push(album);
                                if (callback !== undefined && typeof callback === "function")
                                    callback(album);
                                return true;
                            }
                        });
                }
                return false;
            }
        },

        events: {
            getAll: function () {
                return events;
            },

            getByParticipantId: function (participantId) {
                if (participantId !== undefined) {
                    var result = [];
                    var length = events.length;
                    for (var i = 0; i < length; i++) {
                        var length2 = events[i].participants.length;
                        for (var x = 0; x < length2; x++) {
                            if (events[i].participants[x] === participantId)
                                result.push(events[i].participants[x]);
                        }
                    }
                    return result;
                }
                return false;
            },

            add: function (event) {
                if (event !== undefined) {
                    events.push(event);
                    return true;
                }
            }
        }
    };

    return api;
};




function LoginController ($log, $scope, $application, $http, $location, $cookies) {
    $scope.app = $application;
    $scope.email = "";
    $scope.password = "";
    $scope.errors = [];
    $scope.noUserFound = false;


    $scope.send = function () {
        $scope.errors = [];
        if ($scope.email === "")
            $scope.errors["email"] = "Вы не указали e-mail";
        if ($scope.password === "")
            $scope.errors["password"] = "Вы не указали пароль";
        if (Object.keys($scope.errors).length === 0) {

            $http.post("serverside/api.php", { action: "login", data: { email: $scope.email, password: $scope.password } })
                .success(function (data) {
                    if (data !== undefined) {
                        $log.log(data);
                        if (data !== "error") {
                            if (data !== "false") {
                                var user = new User();
                                user.fromSource(data);
                                $application.setSessionUser(user.id)
                                $scope.noUserFound = false;
                                $cookies.user_id = user.id.toString();
                                $location.url("/news");
                            } else {
                                $scope.noUserFound = true;
                            }
                        }
                    }
                });
        }
    };
};




function NewsController ($log, $scope, $application, $location, $http) {
    $scope.app = $application;
    $scope.inAddMode = false;
    $scope.app.activeMenu("#/news");
    $scope.now = new moment();


    $scope.gotoNewArticle = function () {
        $location.url("/add-article");
    };

    $scope.edit = function (id) {
        if (id !== undefined) {
            var length = $application.getNews().length;
            for (var i = 0; i < length; i++) {
                if ($application.getNews()[i].id === id) {
                    $application.setCurrentArticle($application.getNews()[i]);
                    $location.url("/edit-article");
                }
            }
        }
    };

    $scope.delete = function (id) {
        if (id !== undefined) {
            var length = $application.getNews().length;
            for (var i = 0; i < length; i++) {
                if ($application.getNews()[i].id === id) {
                    $application.getNews()[i].deleting = true;
                }
            }
        }
    };


    $scope.remove = function (id) {
        if (id !== undefined) {
            $http.post("serverside/api.php", { action: "deleteArticle", data: { id: id } })
                .success(function (data) {
                    if (data !== undefined) {
                        $log.log(JSON.parse(data));
                        if (JSON.parse(data) === "success") {
                            var length = $application.getNews().length;
                            for (var i = 0; i < length; i++) {
                                if ($application.getNews()[i].id === id) {
                                    $application.getNews().splice(i, 1);
                                    break;
                                }
                            }
                        }
                    }
                });
        }
    };


    $scope.selectTag = function (tag) {
        if (tag !== undefined) {
            var length = $application.getTags().length;
            for (var i = 0; i < length; i++) {
                if ($application.getTags()[i].title === tag) {
                    if ($application.getTags()[i].isSelected === false) {
                        $application.getTags()[i].isSelected = true;
                    } else {
                        $application.getTags()[i].isSelected = false;
                    }
                }
            }
        }
    };
};



function ArticleController ($scope, $application, $http, $location, $routeParams) {
    $scope.app = $application;
    $scope.article = new Article();
    $scope.newTag = new Tag();
    $scope.newComment = new Comment();
    $scope.errors = [];
    $scope.inAddCommentMode = false;
    $scope.app.activeMenu("#/news");

    if ($routeParams.articleId !== undefined && $application.getNews().length !== 0) {
        var length = $application.getNews().length;
        for (var i = 0; i < length; i++) {
            if ($application.getNews()[i].id === parseInt($routeParams.articleId))
                $scope.article = $application.getNews()[i];
        }
    }

    $scope.gotoNews = function () {
        $location.url("/news");
    };

    $scope.validate = function () {
        if ($scope.newArticle.validate() === 0) {
            $http.post("serverside/api.php", { action: "addArticle", data: { userId: $application.getSessionUser().id, title: $scope.newArticle.title, content: $scope.newArticle.content } })
                .success(function (data) {
                    if (data !== undefined) {
                        var article = new Article();
                        article.fromSource(data);
                        $application.getNews().push(article);
                        $scope.newArticle.cancel();
                        $location.url("/news");
                    }
                });
        }
    };

    $scope.addTag = function (tag) {
        if (tag !== undefined) {
            var tag = new Tag();
            tag.title = tag;
            $scope.article.tags.push(tag);
            return true;
        }
    };

    $scope.cancelAddComment = function () {
        $scope.inAddCommentMode = false;
        $scope.newComment.content = "";
    };

    $scope.addComment = function () {
        if ($scope.newComment.validate() === 0) {
            $scope.newComment.articleId = $scope.article.id;
            $scope.newComment.userId = $application.getSessionUser().id;
            $application.comments.add($scope.newComment, function (comment) {
                $scope.article.comments.push(comment);
                $scope.inAddCommentMode = false;
                $scope.newComment.content = "";
            });
        }
    };
};



function NewArticleController ($scope, $log,$application, $http, $location) {
    $scope.app = $application;
    $scope.newArticle = new Article();
    $scope.newTag = new Tag();
    $scope.errors = [];
    $scope.uploaderData = {
        articleId: $scope.newArticle.id,
        userId: $application.getSessionUser().id
    };
    $scope.app.activeMenu("#/news");

    $scope.gotoNews = function () {
        $location.url("/news");
    };

    $scope.validate = function () {
        if ($scope.newArticle.validate() === 0) {
            var params = {
                action: "addArticle",
                data: {
                    articleId: $scope.newArticle.id,
                    userId: $application.getSessionUser().id,
                    title: $scope.newArticle.title,
                    preview: $scope.newArticle.preview,
                    content: $scope.newArticle.content,
                    tags: $scope.newArticle.joinTags()
                }
            };
            $http.post("serverside/api.php", params)
                .success(function (data) {
                    if (data !== undefined) {
                        var article = new Article();
                        article.fromSource(data);
                        $application.getNews().push(article);
                        $scope.newArticle.cancel();

                        var length = $scope.newArticle.tags.length;
                        for (var i = 0; i < length; i++) {
                            if (!$application.tags.getByTitle($scope.newArticle.tags[i].title)) {
                                $application.tags.add($scope.newArticle.tags[i]);
                            }
                        }

                        $location.url("/");
                    }
                });
        }
    };


    $scope.onBeforeUploadAttachment = function () {
        $scope.uploaderData.articleId = $scope.newArticle.id;
    };

    $scope.onCompleteUploadAttachment = function (data) {
        $log.log(data);
        $scope.newArticle.image = data.image;
        $scope.newArticle.id = parseInt(data.id);
    };

    $scope.addTag = function () {
        if ($scope.newTag.validate() === 0) {
            var tag = new Tag();
            tag.title = $scope.newTag.title;
            $scope.newArticle.tags.push(tag);
            $scope.newTag.title = "";
        }
    };
};



function EditArticleController ($log, $scope, $application, $http, $location) {
    $scope.app = $application;
    $scope.article = $application.getCurrentArticle();
    $scope.newTag = new Tag();
    $scope.uploaderData = {
        articleId: $scope.article.id
    };
    $log.log("art = ", $scope.article);


    $scope.gotoNews = function () {
        $scope.article.cancel();
        $scope.article.errors = [];
        $location.url("/news");
    };

    $scope.save = function () {
        if ($scope.article.validate() === 0) {
            var params = {
                action: "editArticle",
                data: {
                    id: $scope.article.id,
                    title: $scope.article.title,
                    preview: $scope.article.preview,
                    content: $scope.article.content,
                    tags: $scope.article.joinTags()
                }
            };
            $http.post("serverside/api.php", params)
                .success(function (data) {
                    if (data !== undefined) {
                        var article = new Article();
                        article.fromSource(data);
                        $scope.article.title = article.title;
                        $scope.article.content = article.content;
                        article.changed = false;
                        article.editing = false;
                        $scope.article.errors = [];

                        var length = $scope.article.tags.length;
                        for (var i = 0; i < length; i++) {
                            if (!$application.tags.getByTitle($scope.article.tags[i].title)) {
                                $application.tags.add($scope.article.tags[i]);
                            }
                        }

                        $location.url("/news");
                    }
                });
        }
    };

    $scope.addTag = function () {
        if ($scope.newTag.validate() === 0) {
            var tag = new Tag();
            tag.title = $scope.newTag.title;
            var length = $scope.article.tags.length;
            for (var i = 0; i < length; i++) {
                if ($scope.article.tags[i].title === $scope.newTag.title) {
                    $scope.newTag.errors["title"] = "Такой тег уже есть";
                    return false;
                }
            }
            $scope.article.tags.push(tag);
            $scope.newTag.title = "";
            $scope.article.changed = true;
        }
    };


    $scope.onBeforeUploadAttachment = function () {
        $scope.uploaderData.articleId = $scope.article.id;
    };


    $scope.onCompleteUploadAttachment = function (data) {
        $log.log(data);
        //$scope.article.image = data.image;
        $application.getCurrentArticle().image = data.image;
        //$scope.article.id = parseInt(data.id);
    };

};



function SpecialitiesController ($log, $scope, $application, $http) {
    $scope.app  = $application;
    $scope.inAddMode = false;
    $scope.newSpeciality = new Speciality();
    $scope.errors = [];
    $scope.app.activeMenu("#/specialities");


    $scope.addMode = function (flag) {
        if (flag !== undefined)
            if (flag === false) {
                $scope.newSpeciality.title = "";
                $scope.newSpeciality.duration = 0;
                $scope.errors = [];
            }
            $scope.inAddMode = flag;
    };


    $scope.add = function () {
        $scope.errors = [];
        if ($scope.newSpeciality.title === "")
            $scope.errors["title"] = "Вы не указали наименование специальности";
        if ($scope.newSpeciality.duration === "" || $scope.newSpeciality.duration === 0 || $scope.newSpeciality.duration < 0)
            $scope.errors["duration"] = "Вы не указали срок обучения";
        $log.log($scope.errors);
        $log.log(Object.keys($scope.errors).length);

        if (Object.keys($scope.errors).length === 0) {
            $http.post("serverside/api.php", { action: "addSpeciality", data: { title: $scope.newSpeciality.title, duration: $scope.newSpeciality.duration}})
                .success(function (data) {
                    if (data !== undefined) {
                        if (data !== "error") {
                            var speciality = new Speciality();
                            speciality.fromSource(data);
                            $application.addSpeciality(speciality);
                            $scope.addMode(false);
                        }
                    }
                });
        }
    };


    $scope.edit = function (id) {
        if (id !== undefined) {
            var length = $application.getSpecialities().length;
            for (var i = 0; i < length; i++) {
                if ($application.getSpecialities()[i].id === id) {
                    $application.getSpecialities()[i].editing = true;
                }
            }
        }
    };


    $scope.save = function (id) {
        if (id !== undefined) {
            var length = $application.getSpecialities().length;
            for (var i = 0; i < length; i++) {
                if ($application.getSpecialities()[i].id === id) {
                    var spec = $application.getSpecialities()[i];
                    $log.log(spec);
                    if (spec.validate() === 0) {
                        $http.post("serverside/api.php", { action: "editSpeciality", data: { id: spec.id, title: spec.title, duration: spec.duration} })
                            .success(function (data) {
                               if (data !== undefined) {
                                   var speciality = new Speciality();
                                   speciality.fromSource(data);
                                   spec.title = speciality.title;
                                   spec.duration = speciality.duration;
                                   spec.changed = false;
                                   spec.editing = false;
                               }
                            });
                    }
                }
            }
        }
    };


    $scope.delete = function (id) {
        if (id !== undefined) {
            var length = $application.getSpecialities().length;
            for (var i = 0; i < length; i++) {
                if ($application.getSpecialities()[i].id === id) {
                   $application.getSpecialities()[i].deleting = true;
                }
            }
        }
    };


    $scope.remove = function (id) {
        if (id !== undefined) {
            $http.post("serverside/api.php", { action: "deleteSpeciality", data: { id: id } })
                .success(function (data) {
                    if (data !== undefined) {
                        $log.log(JSON.parse(data));
                        if (JSON.parse(data) === "success") {
                            var length = $application.getSpecialities().length;
                            for (var i = 0; i < length; i++) {
                                if ($application.getSpecialities()[i].id === id) {
                                    $application.getSpecialities().splice(i, 1);
                                }
                            }

                            length = $application.getUsers().length;
                            for (var i = 0; i < length; i++) {
                                if ($application.getUsers()[i].isProfessor === false && $application.getUsers()[i].specialityId === id) {
                                    $application.getUsers()[i].specialityId = 0;
                                }
                            }
                        }
                    }
                });
        }
    };


};



function ProfessorsController ($log, $scope, $application, $location, $http) {
    $scope.app = $application;
    $scope.app.activeMenu("#/professors");

    $scope.gotoNewProfessor = function () {
        $location.url("/new-professor");
    };


    $scope.edit = function (id) {
        if (id !== undefined) {
            var length = $application.getUsers().length;
            for (var i = 0; i < length; i++) {
                if ($application.getUsers()[i].id === id) {
                    $application.setCurrentUser($application.getUsers()[i]);
                    $location.url("/edit-professor");
                }
            }
        }
    };


    $scope.delete = function (id) {
        if (id !== undefined) {
            var length = $application.getUsers().length;
            for (var i = 0; i < length; i++) {
                if ($application.getUsers()[i].id === id) {
                    $application.getUsers()[i].deleting = true;
                }
            }
        }
    };


    $scope.remove = function (id) {
        if (id !== undefined) {
            $http.post("serverside/api.php", { action: "deleteProfessor", data: { id: id } })
                .success(function (data) {
                    if (data !== undefined) {
                        $log.log(JSON.parse(data));
                        if (JSON.parse(data) === "success") {
                            var length = $application.getUsers().length;
                            for (var i = 0; i < length; i++) {
                                if ($application.getUsers()[i].id === id) {
                                    $application.getUsers().splice(i, 1);
                                    break;
                                }
                            }
                        }
                    }
                });
        }
    };
};



function NewProfessorController ($scope, $application, $http, $location) {
    $scope.app = $application;
    $scope.newProfessor = new User();
    $scope.errors = [];
    $scope.app.activeMenu("#/professors");

    $scope.gotoProfessors = function () {
        $location.url("/professors");
    };

    $scope.validate = function () {
        if ($scope.newProfessor.validate() === 1) {
            $http.post("serverside/api.php", { action: "addProfessor", data: { surname: $scope.newProfessor.surname, name: $scope.newProfessor.name, fname: $scope.newProfessor.fname, email: $scope.newProfessor.email, password: $scope.newProfessor.password} })
                .success(function (data) {
                    if (data !== undefined) {
                        var user = new User();
                        user.fromSource(data);
                        $application.getUsers().push(user);
                        $scope.newProfessor.cancel();
                        $location.url("/professors");
                    }
                });
        }
    };
};



function EditProfessorController ($scope, $application, $http, $location) {
    $scope.app = $application;
    $scope.professor = $application.getCurrentUser();

    $scope.professor.cancel();
    $scope.professor.errors = [];

    $scope.gotoStudents = function () {
        $scope.professor.cancel();
        $scope.professor.errors = [];
        $location.url("/professors");
    };

    $scope.save = function () {
        if ($scope.professor.validate() == 1) {
            $http.post("serverside/api.php",{ action: "editProfessor",  data: { id: $scope.professor.id, surname: $scope.professor.surname, name: $scope.professor.name, fname: $scope.professor.fname, email: $scope.professor.email, password: $scope.professor.password }})
                .success(function (data) {
                    if (data !== undefined) {
                        var user = new User();
                        user.fromSource(data);
                        user.changed = false;
                        user.editing = false;
                        $location.url("/professors");
                    }
                });
        }
    };

};


function StudentsController ($log, $scope, $application, $location, $http) {
    $scope.app = $application;
    $scope.app.activeMenu("#/students");

    
    $scope.gotoNewStudent = function () {
        $location.url("/new-student");
    };

    
    $scope.edit = function (id) {
        if (id !== undefined) {
            var length = $application.getUsers().length;
            for (var i = 0; i < length; i++) {
                if ($application.getUsers()[i].id === id) {
                    $application.setCurrentUser($application.getUsers()[i]);
                    $location.url("/edit-student");
                }
            }
        }
    };

    $scope.delete = function (id) {
        if (id !== undefined) {
            var length = $application.getUsers().length;
            for (var i = 0; i < length; i++) {
                if ($application.getUsers()[i].id === id) {
                    $application.getUsers()[i].deleting = true;
                }
            }
        }
    };


    $scope.remove = function (id) {
        if (id !== undefined) {
            $http.post("serverside/api.php", { action: "deleteStudent", data: { id: id } })
                .success(function (data) {
                    if (data !== undefined) {
                        $log.log(JSON.parse(data));
                        if (JSON.parse(data) === "success") {
                            var length = $application.getUsers().length;
                            for (var i = 0; i < length; i++) {
                                if ($application.getUsers()[i].id === id) {
                                    $application.getUsers().splice(i, 1);
                                    break;
                                }
                            }

                            length = $application.getResults().length;
                            for (var i = 0; i < length; i++) {
                                if ($application.getResults()[i].studentId === id) {
                                    $application.getResults().splice(i, 1);
                                    length = $application.getResults().length;
                                    i--;
                                }
                            }
                        }
                    }
                });
        }
    };
};



function StudentsFilter ($log) {
    return function (input) {
        var result = [];
        var length = input.length;
        for (var i = 0; i < length; i++) {
            if (input[i].isProfessor === false) {
                result.push(input[i]);
            }
        }
        return result;
    };
};



function ProfessorsFilter ($log) {
    return function (input) {
        var result = [];
        var length = input.length;
        for (var i = 0; i < length; i++) {
            if (input[i].isProfessor === true) {
                result.push(input[i]);
            }
        }
        return result;
    };
};



function ProfessorIdFilter ($log) {
    return function (input, id) {
        var result = [];
        var length = input.length;
        for (var i = 0; i < length; i++) {
            if (input[i].professorId === id) {
                result.push(input[i]);
            }
        }
        return result;
    };
};



function tagsFilter ($log, $application) {
    return function (input) {
        if ($application.getSelectedTags().length !== 0) {
            var result = [];
            var length = input.length;
            for (var i = 0; i < length; i++) {

                var length2 = input[i].tags.length;
                for (var z = 0; z < length2; z++) {

                    var length3 = $application.getSelectedTags().length;
                    for (var x = 0; x < length3; x++) {
                        if ($application.getSelectedTags()[x].title === input[i].tags[z].title) {

                            var length4 = result.length;
                            var found = false;
                            for (var o = 0; o < length4; o++) {
                                if (result[o].id === input[i].id)
                                    found = true;
                            }

                            if (!found)
                                result.push(input[i]);

                        }

                    }

                }

            }
            return result;
        } else
            return input;
    };
};



function participantsFilter ($log) {
    return function (input, users) {
        var result = [];
        var length = input.length;
        for (var i = 0; i < length; i++) {

            var length2 = users.length;
            var found = false;
            for (var x = 0; x < length2; x++) {
                if (users[x].id === input[i].id)
                    found = true;
            }
            if (found === false)
                result.push(input[i]);
        }
        return result;
    };
};



function NewStudentController ($scope, $application, $http, $location) {
    $scope.app = $application;
    $scope.newUser = new User();
    $scope.errors = [];
    $scope.app.activeMenu("#/students");

    $scope.gotoStudents = function () {
        $location.url("/students");
    };

    $scope.validate = function () {
       if ($scope.newUser.validate() === 0) {
            $http.post("serverside/api.php", { action: "addStudent", data: { surname: $scope.newUser.surname, name: $scope.newUser.name, fname: $scope.newUser.fname, specialityId: $scope.newUser.specialityId, email: $scope.newUser.email, password: $scope.newUser.password} })
                .success(function (data) {
                    if (data !== undefined) {
                        var user = new User();
                        user.fromSource(data);
                        $application.getUsers().push(user);
                        $scope.newUser.cancel();
                        $location.url("/students");
                    }
                });
       }
    };
};


function EditStudentController ($scope, $application, $http, $location) {
    $scope.app = $application;
    $scope.user = $application.getCurrentUser();

    $scope.user.cancel();
    $scope.user.errors = [];

    $scope.gotoStudents = function () {
        $scope.user.cancel();
        $scope.user.errors = [];
        $location.url("/students");
    };

    $scope.save = function () {
        if ($scope.user.validate() === 0) {
            $http.post("serverside/api.php",{ action: "editStudent",  data: { id: $scope.user.id, surname: $scope.user.surname, name: $scope.user.name, fname: $scope.user.fname, specialityId: $scope.user.specialityId, email: $scope.user.email, password: $scope.user.password }})
                .success(function (data) {
                    if (data !== undefined) {
                        var user = new User();
                        user.fromSource(data);
                        user.changed = false;
                        user.editing = false;
                        $location.url("/students");
                    }
                });
        }
    };

};



function ResultsController ($log, $scope, $application, $location, $http) {
    $scope.app = $application;
    $scope.newResult = new Result();
    $scope.inAddMode = false;
    $scope.app.activeMenu("#/results");

    $scope.gotoNewResult = function () {
        $location.url("/new-result");
    };

    $scope.addMode = function (flag) {
        if (flag !== undefined)
            if (flag === false) {
                $scope.newResult.cancel();
                $scope.newResult.errors = [];
            }
        $scope.inAddMode = flag;
    };


    $scope.add = function () {
        $log.log($scope.newResult.errors);
        if ($scope.newResult.validate() === 0) {
            $http.post("serverside/api.php", { action: "addResult", data: { studentId: $scope.newResult.studentId, professorId: $application.getSessionUser().id, disciplineId: $scope.newResult.disciplineId, value: $scope.newResult.value} })
                .success(function (data) {
                    if (data !== undefined) {
                        var result = new Result();
                        result.fromSource(data);
                        $application.getResults().push(result);
                        $scope.addMode(false);
                        $scope.newResult.cancel();
                        $scope.newResult.errors = [];
                    }
                });
        }
    };


    $scope.edit = function (id) {
        if (id !== undefined) {
            var length = $application.getResults().length;
            for (var i = 0; i < length; i++) {
                if ($application.getResults()[i].id === id) {
                    $application.getResults()[i].editing = true;
                }
            }
        }
    };


    $scope.save = function (id) {
        if (id !== undefined) {
            var length = $application.getResults().length;
            for (var i = 0; i < length; i++) {
                if ($application.getResults()[i].id === id) {
                    var result = $application.getResults()[i];
                    $log.log(result);
                    if (result.validate() === 0) {
                        $http.post("serverside/api.php", { action: "editResult", data: { id: result.id, studentId: result.studentId, disciplineId: result.disciplineId, value: result.value} })
                            .success(function (data) {
                                if (data !== undefined) {
                                    //var result = new Result();
                                    //result.fromSource(data);
                                    result.changed = false;
                                    result.editing = false;
                                }
                            });
                    }
                }
            }
        }
    };


    $scope.delete = function (id) {
        if (id !== undefined) {
            var length = $application.getResults().length;
            for (var i = 0; i < length; i++) {
                if ($application.getResults()[i].id === id) {
                    $application.getResults()[i].deleting = true;
                }
            }
        }
    };


    $scope.remove = function (id) {
        if (id !== undefined) {
            $http.post("serverside/api.php", { action: "deleteResult", data: { id: id } })
                .success(function (data) {
                    if (data !== undefined) {
                        $log.log(JSON.parse(data));
                        if (data === "success") {
                            var length = $application.getResults().length;
                            var result = undefined;
                            for (var i = 0; i < length; i++) {
                                if ($application.getResults()[i].id === id) {
                                    $application.getResults().splice(i, 1);
                                    result = $application.getResults()[i];
                                }
                            }

                            length = $application.getUsers().length;
                            for (var i = 0; i < length; i++) {
                                if ($application.getUsers()[i].id === result.studentId) {
                                    $application.getUsers().splice(i, 1);
                                }
                            }
                        }
                    }
                });
        }
    };

};




function NewResultController ($scope, $application, $http, $location) {
    $scope.app = $application;
    $scope.newResult = new Result();
    $scope.errors = [];
    $scope.app.activeMenu("#/results");

    $scope.gotoResults = function () {
        $location.url("/results");
    };

    $scope.validate = function () {
        if ($scope.newResult.validate() === 1) {
            $http.post("serverside/api.php", { action: "addResult", data: { studentId: $scope.newResult.studentId, professorId: $application.getSessionUser().id, disciplineId: $scope.newResult.disciplineId, value: $scope.newResult.value} })
                .success(function (data) {
                    if (data !== undefined) {
                        var result = new Result();
                        result.fromSource(data);
                        $application.getResults().push(result);
                        $scope.newResult.cancel();
                        $location.url("/results");
                    }
                });
        }
    };
};





function DisciplinesController ($log, $scope, $application, $http) {
    $scope.app  = $application;
    $scope.inAddMode = false;
    $scope.newDiscipline = new Discipline();
    $scope.errors = [];
    $scope.app.activeMenu("#/disciplines");


    $scope.addMode = function (flag) {
        if (flag !== undefined)
            if (flag === false) {
                $scope.newDiscipline.title = "";
                $scope.newDiscipline.duration = 0;
                $scope.errors = [];
                $scope.newDiscipline.cancel();
                $scope.newDiscipline.errors = [];
            }
        $scope.inAddMode = flag;
    };


    $scope.add = function () {
        $scope.errors = [];

        if ($scope.newDiscipline.validate() === 0) {
            $http.post("serverside/api.php", { action: "addDiscipline", data: { title: $scope.newDiscipline.title, professorId: $scope.newDiscipline.professorId}})
                .success(function (data) {
                    if (data !== undefined) {
                        if (data !== "error") {
                            var discipline = new Discipline();
                            discipline.fromSource(data);
                            $application.addDiscipline(discipline);
                            $scope.addMode(false);
                        }
                    }
                });
        }
    };


    $scope.edit = function (id) {
        if (id !== undefined) {
            var length = $application.getDisciplines().length;
            for (var i = 0; i < length; i++) {
                if ($application.getDisciplines()[i].id === id) {
                    $application.getDisciplines()[i].editing = true;
                }
            }
        }
    };


    $scope.save = function (id) {
        if (id !== undefined) {
            var length = $application.getDisciplines().length;
            for (var i = 0; i < length; i++) {
                if ($application.getDisciplines()[i].id === id) {
                    var disc = $application.getDisciplines()[i];
                    $log.log(disc);
                    if (disc.validate() === 0) {
                        $http.post("serverside/api.php", { action: "editDiscipline", data: { id: disc.id, title: disc.title} })
                            .success(function (data) {
                                if (data !== undefined) {
                                    var discipline = new Discipline();
                                    discipline.fromSource(data);
                                    disc.title = discipline.title;
                                    disc.changed = false;
                                    disc.editing = false;
                                }
                            });
                    }
                }
            }
        }
    };


    $scope.delete = function (id) {
        if (id !== undefined) {
            var length = $application.getDisciplines().length;
            for (var i = 0; i < length; i++) {
                if ($application.getDisciplines()[i].id === id) {
                    $application.getDisciplines()[i].deleting = true;
                }
            }
        }
    };


    $scope.remove = function (id) {
        if (id !== undefined) {
            $http.post("serverside/api.php", { action: "deleteDiscipline", data: { id: id } })
                .success(function (data) {
                    if (data !== undefined) {
                        $log.log(JSON.parse(data));
                        if (JSON.parse(data) === "success") {
                            var length = $application.getDisciplines().length;
                            for (var i = 0; i < length; i++) {
                                if ($application.getDisciplines()[i].id === id) {
                                    $application.getDisciplines().splice(i, 1);
                                }
                            }

                            length = $application.getResults().length;
                            for (var i = 0; i < length; i++) {
                                if ($application.getResults()[i].disciplineId === id) {
                                    $application.getResults().splice(i, 1);
                                    length = $application.getResults().length;
                                    i--;
                                }
                            }
                        }
                    }
                });
        }
    };


};






function runFunction ($log, $rootScope, $application, $cookies) {
    $rootScope.application = $application;
    
    moment.locale("ru");

    $log.info(window.initData);

    if (window.initData !== null && window.initData !== undefined) {
        if (window.initData.users !== null && window.initData.users !== undefined) {
            var length = window.initData.users.length;
            for (var i = 0; i < length; i++) {
                var user = new User();
                user.fromSource(window.initData.users[i]);
                $application.addUser(user);
            }
            $log.log($application.getUsers());
        }

        if (window.initData.specialities !== null && window.initData.specialities !== undefined) {
            var length = window.initData.specialities.length;
            for (var i = 0; i < length; i++) {
                var speciality = new Speciality();
                speciality.fromSource(window.initData.specialities[i]);
                $application.addSpeciality(speciality);
            }
            $log.log($application.getSpecialities());
        }

        if (window.initData.disciplines !== null && window.initData.disciplines !== undefined) {
            var length = window.initData.disciplines.length;
            for (var i = 0; i < length; i++) {
                var discipline = new Discipline();
                discipline.fromSource(window.initData.disciplines[i]);
                $application.addDiscipline(discipline);
            }
            $log.log($application.getDisciplines());
        }

        if (window.initData.results !== null && window.initData.results !== undefined) {
            var length = window.initData.results.length;
            for (var i = 0; i < length; i++) {
                var result = new Result();
                result.fromSource(window.initData.results[i]);
                $application.addResult(result);
            }
            $log.log($application.getResults());
        }

        if (window.initData.news !== null && window.initData.news !== undefined) {
            var length = window.initData.news.length;
            for (var i = 0; i < length; i++) {
                $log.log(window.initData.news[i].comments);

                var article = new Article();
                article.fromSource(window.initData.news[i].article);
                var l = article.tags.length;
                for (var x = 0; x < l; x++) {
                    if (!$application.getTag(article.tags[x].title))
                        $application.getTags().push(article.tags[x]);
                }

                var l = window.initData.news[i].comments.length;
                for (var x = 0; x < l; x++) {
                    var comment = new Comment();
                    comment.fromSource(window.initData.news[i].comments[x]);
                    article.addComment(comment);
                }
                $application.addArticle(article);
            }
            $log.log($application.getNews());
        }

        if (window.initData.albums !== null && window.initData.albums !== undefined) {
            var length = window.initData.albums.length;
            for (var i = 0; i < length; i++) {
                var album = new PhotoAlbum();
                album.fromSource(window.initData.albums[i].album);

                var length2 = window.initData.albums[i].photos.length;
                for (var x = 0; x < length2; x++) {
                    var photo = new Photo();
                    photo.fromSource(window.initData.albums[i].photos[x]);
                    album.photos.push(photo);
                }

                $application.albums.getAll().push(album);
            }
            $log.log($application.albums.getAll());
        }

        if (window.initData.events !== null && window.initData.events !== undefined) {
            $log.log(window.initData.events);
            var length = window.initData.events.length;
            for (var i = 0; i < length; i++) {
                var event = new UserEvent();
                event.fromSource(window.initData.events[i]);

                var participants = event.participants.split(";");

                var length2 = participants.length;
                for (var x = 0; x < length2; x++) {
                    event.users.push($application.getUserById(parseInt(participants[x])));
                }

                $application.events.getAll().push(event);
            }
            $log.log("events", $application.events.getAll());
        }
    }


    if ($cookies.user_id !== undefined) {
        $application.setSessionUser(parseInt($cookies.user_id));
    }


};



function AlbumsController ($log, $scope, $application) {
    $scope.app = $application;
    $scope.newAlbum = new PhotoAlbum();
    $scope.inAddMode = false;
    $scope.app.activeMenu("#/albums");

    $scope.cancelAddAlbum = function () {
        $scope.inAddMode = false;
        $scope.newAlbum.title = "";
    };

    $scope.add = function () {
        $scope.newAlbum.userId = $application.getSessionUser().id;
        if ($scope.newAlbum.validate() === 0) {
            $application.albums.add($scope.newAlbum, function (album) {
                $scope.newAlbum.title = "";
                $scope.inAddMode = false;
            });
        }
    };
};





function AlbumController ($scope, $log, $application, $http, $location, $routeParams) {
    $scope.app = $application;
    $scope.album = new PhotoAlbum();
    $scope.app.activeMenu("#/albums");
    $scope.uploaderData = {
        albumId: 0,
        userId: 0
    };

    if ($routeParams.albumId !== undefined && $application.albums.getAll().length !== 0) {
        var length = $application.albums.getAll().length;
        for (var i = 0; i < length; i++) {
            if ($application.albums.getAll()[i].id === parseInt($routeParams.albumId))
                $scope.album = $application.albums.getAll()[i];
        }
    }
    if ($scope.album.id === 0)
        $location.url("/albums");

    $scope.gotoNews = function () {
        $location.url("/albums");
    };

    $scope.onBeforeUploadPhoto = function () {
        $scope.uploaderData.albumId = $scope.album.id;
        $scope.uploaderData.userId = $application.getSessionUser().id;
    };

    $scope.onCompleteUploadPhoto = function (data) {
        $log.log(data);

        var photo = new Photo();
        photo.fromSource(data);
        $scope.album.photos.push(photo);
    };

};



function NewEventController ($scope, $log, $application, $http, $location) {
    $scope.app = $application;
    $scope.newEvent = new UserEvent();
    $scope.newUser = new User();
    $scope.errors = [];
    $scope.date = "";
    $scope.app.activeMenu("#/news");


    $scope.addParticipant = function () {
        /*
        var length = $application.getUsers().length;
        for (var i = 0; i < length; i++) {
            if ($application.getUsers()[i].id === $scope.newUser.id) {
                $scope.newEvent.users.push($application.getUsers()[i]);
                $scope.newUser.id = 0;
                return true;
            }
        }
        */
        if ($scope.newUser.id !== 0) {
            $scope.newEvent.users.push($application.getUserById($scope.newUser.id));
            $scope.newUser.id = 0;
            return true;
        }
    };



    $scope.remove = function (id) {
        if (id !== undefined) {
            var length = $scope.newEvent.users.length;
            for (var i = 0; i < length; i++) {
                if ($scope.newEvent.users[i].id === id) {
                    $scope.newEvent.users.splice(i, 1);
                    length = $scope.newEvent.users.length;
                }
            }
        }
    };



    $scope.validate = function () {
        $scope.errors = [];


        if ($scope.newEvent.title === "")
            $scope.errors["title"] = "Вы не указали наименование";

        if ($scope.newEvent.content === "")
            $scope.errors["content"] = "Вы не указали содержание";

        if ($scope.newEvent.users.length === 0)
            $scope.errors["participants"] = "Вы не выбрали ни одного участника";

        if ($scope.date === "") {
            $scope.errors["date"] = "Вы не указали дату события";
        } else {
            var reg = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
            if ($scope.date.match(reg)) {
                if (new moment().unix() > moment($scope.date, "DD.MM.YYYY").unix())
                    $scope.errors["date"] = "Дата события не может быть раньше текущей даты";
                else
                    $scope.newEvent.date = moment($scope.date, "DD.MM.YYYY").unix();
            } else
                $scope.errors["date"] = "Дата события указана некорректно";
        }

        $log.log("errors = ", $scope.errors.length);
        if ($scope.errors["title"] === undefined && $scope.newEvent.content !== undefined && $scope.errors["date"] === undefined && $scope.errors["participants"] === undefined) {
            var params = {
                action: "addEvent",
                data: {
                    userId: $application.getSessionUser().id,
                    title: $scope.newEvent.title,
                    content: $scope.newEvent.content,
                    date: $scope.newEvent.date,
                    participants: $scope.newEvent.joinParticipants()
                }
            };
            $http.post("/serverside/api.php", params)
                .success(function (data) {
                    if (data !== undefined) {
                        var ev = new UserEvent();
                        ev.fromSource(data);
                        var users = ev.participants.split(";");
                        var length = users.length;
                        for (var i = 0; i < length; i++) {
                            ev.users.push($application.getUserById(parseInt(users[i])));
                        }
                        $application.events.add(ev);
                        $location.url("/");
                        return true;
                    }
                });
        }
    };
};


function EventController ($scope, $log, $application, $http, $location, $routeParams) {
    $scope.app = $application;
    $scope.event = new UserEvent();
    $scope.app.activeMenu("#/news");


    if ($routeParams.eventId !== undefined && $application.events.getAll().length !== 0) {
        var length = $application.events.getAll().length;
        for (var i = 0; i < length; i++) {
            if ($application.events.getAll()[i].id === parseInt($routeParams.eventId))
                $scope.event = $application.events.getAll()[i];
        }
    }
    if ($scope.event.id === 0)
        $location.url("/news");

    $scope.gotoNews = function () {
        $location.url("/news");
    };


};