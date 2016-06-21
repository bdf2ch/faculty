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


function User (parameters) {
    this.id = 0;
    this.specialityId = 0;
    this.surname = "";
    this.name = "";
    this.fname = "";
    this.email = "";
    this.isProfessor = false;

    if (parameters !== undefined) {
        for (var param in parameters) {
            if (this.hasOwnProperty(param))
                this[param] = parameters[param];
        }
    }

    this.fromSource = function (data) {
        if (data !== undefined) {
            for (var field in data) {
                switch (field) {
                    case "id":
                        this.id = parseInt(data[field]);
                        break;
                    case "speciality_id":
                        this.specialityId = parseInt(data[field]);
                        break;
                    case "surname":
                        this.surname = data[field];
                        break;
                    case "name":
                        this.name = data[field];
                        break;
                    case "fname":
                        this.fname = data[field];
                        break
                    case "email":
                        this.email = data[field];
                        break;
                    case "is_professor":
                        this.isProfessor = new Boolean(parseInt(data[field]));
                        break;
                }
            }
        }
    };
};



angular
    .module("app", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "templates/news.html",
                controller: "NewsController"
            })
            .when("/news", {
                templateUrl: "templates/news.html",
                controller: "NewsController"
            })
            .when("/specialities", {
                templateUrl: "templates/specialities.html",
                controller: "SpecialitiesController"
            })
            .when("/professors", {
                templateUrl: "templates/professors.html",
                controller: "ProfessorsController"
            })
            .when("/students", {
                templateUrl: "templates/students.html",
                controller: "StudentsController"
            })
            .when("/new-student", {
                templateUrl: "templates/new-student.html",
                controller: "NewStudentController"
            })
            .when("/results", {
                templateUrl: "templates/results.html",
                controller: "ResultsController"
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
    .run(runFunction);



function ApplicationFactory () {
    var menu = [
        new Menu ({ url: "#/news", title: "Новости" }),
        new Menu ({ url: "#/specialities", title: "Направления и специальности" }),
        new Menu ({ url: "#/professors", title: "Педагогический коллектив" }),
        new Menu ({ url: "#/students", title: "Студенты" }),
        new Menu ({ url: "#/results", title: "Результаты экзаменов" })
    ];

    var users = [];

    return {
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
        }
    }
};



function NewsController ($scope, $application) {
    $scope.app = $application;
};



function SpecialitiesController ($scope, $application) {
    $scope.app  = $application;
};



function ProfessorsController ($log, $scope, $application) {
    $scope.app = $application;

    $scope.app.activeMenu("#/professors");
};



function StudentsController ($scope, $application, $route, $location) {
    $scope.app = $application;
    $scope.app.activeMenu("#/students");

    $scope.gotoNewStudent = function () {
        $location.url("/new-student");
    };
};



function NewStudentController ($scope, $application) {
    $scope.app = $application;
    $scope.newUser = new User();
    $scope.newUserPassword = "";
    $scope.errors = [];
    $scope.app.activeMenu("#/students");
    
    $scope.validate = function () {
        $scope.errors.splice(0, $scope.errors.length);
        if ($scope.newUser.surname === "")
            $scope.errors["surname"] = "Вы не указали фамилию студента";
        if ($scope.newUser.name === "")
            $scope.errors["name"] = "Вы не указали имя студента";
        if ($scope.newUser.fname === "")
            $scope.errors["fname"] = "Вы не указали отчество студента";
        if ($scope.newUser.email === "")
            $scope.errors["email"] = "Вы не указали e-mail студента";
    };
};



function ResultsController ($scope, $application) {
    $scope.app = $application;

    $scope.app.activeMenu("#/results");
};



function runFunction ($log, $rootScope, $application) {
    $rootScope.application = $application;

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
    }
};