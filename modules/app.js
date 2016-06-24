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
    //this.preview = "";
    this.content = "";
    this.timestamp = 0;
    this.editing = false;
    this.deleting = false;
    this.changed = false;
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
                    //case "preview":
                    //    this.preview = data[field];
                    //    this.backup.preview = data[field];
                    //    break;
                    case "content":
                        this.content = data[field];
                        this.backup.content = data[field];
                        break;
                    case "timestamp":
                        this.timestamp = new moment.unix(parseInt(data[field]));
                        this.backup.timestamp = new moment.unix(parseInt(data[field]));
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
        //if (this.preview === "")
        //    this.errors["preview"] = "Вы не указали краткое описание новости";
        if (this.content === "")
            this.errors["content"] = "Вы не указали содержание новости новости";
        return Object.keys(this.errors).length;
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
}



angular
    .module("app", ["ngRoute", "ngCookies"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "templates/news.html",
                controller: "NewsController"
            })
            .when("/login", {
                templateUrl: "templates/login.html",
                controller: "LoginController"
            })
            .when("/news", {
                templateUrl: "templates/news.html",
                controller: "NewsController"
            }).
            when("/new-article", {
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
    .run(runFunction);



function ApplicationFactory ($cookies, $location) {
    var menu = [
        new Menu ({ url: "#/news", title: "Новости" }),
        new Menu ({ url: "#/specialities", title: "Специальности" }),
        new Menu ({ url: "#/disciplines", title: "Дисциплины" }),
        new Menu ({ url: "#/professors", title: "Педагогический коллектив" }),
        new Menu ({ url: "#/students", title: "Студенты" }),
        new Menu ({ url: "#/results", title: "Результаты экзаменов" })
    ];

    var users = [];
    var specialities = [];
    var disciplines = [];
    var results = [];
    var news = [];
    var currentUser = undefined;
    var sessionUser = undefined;
    var currentArticle = undefined;
    var marks = [
        { title: "Неудовлетворительно", value: 2 },
        { title: "Удовлетворительно", value: 3 },
        { title: "Хорошо", value: 4 },
        { title: "Отлично", value: 5 },
    ];

    return {
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
        }
    }
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


    $scope.gotoNewArticle = function () {
        $location.url("/new-article");
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
};



function NewArticleController ($scope, $application, $http, $location) {
    $scope.app = $application;
    $scope.newArticle = new Article();
    $scope.errors = [];
    $scope.app.activeMenu("#/news");

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
};



function EditArticleController ($log, $scope, $application, $http, $location) {
    $scope.app = $application;
    $scope.article = $application.getCurrentArticle();
    $log.log("art = ", $scope.article);

   // $scope.article.cancel();


    $scope.gotoNews = function () {
        $scope.article.cancel();
        $scope.article.errors = [];
        $location.url("/news");
    };

    $scope.save = function () {
        if ($scope.article.validate() === 0) {
            $http.post("serverside/api.php",{ action: "editArticle",  data: { id: $scope.article.id, title: $scope.article.title, content: $scope.article.content }})
                .success(function (data) {
                    if (data !== undefined) {
                        var article = new Article();
                        article.fromSource(data);
                        $scope.article.title = article.title;
                        $scope.article.content = article.content;
                        article.changed = false;
                        article.editing = false;
                        $scope.article.errors = [];
                        $location.url("/news");
                    }
                });
        }
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
                var article = new Article();
                article.fromSource(window.initData.news[i]);
                $application.addArticle(article);
            }
            $log.log($application.getNews());
        }
    }


    if ($cookies.user_id !== undefined) {
        $application.setSessionUser(parseInt($cookies.user_id));
    }


};