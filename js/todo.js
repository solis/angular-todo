/**
 * TodoApp Module
 *
 * Description
 */

var TodoApp = angular.module('todoapp', ['ngRoute'])

TodoApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'ListController',
            templateUrl: 'partials/todo.html'
        })
        .when('/archive', {
            controller: 'ArchiveController',
            templateUrl: 'partials/archive.html'
        })
        .otherwise({
            redirectTo: '/'
        });
})

TodoApp.controller('ListController', ['$scope', 'TodoFactory', function ($scope, TodoFactory) {
    $scope.todos =  TodoFactory.getTodos();
    $scope.archive = TodoFactory.getArchive();
    $scope.levels = ['default', 'primary', 'info', 'warning', 'danger'];

    $scope.addTodo = function () {
        $scope.todos.push({task: $scope.todoTask, done: false, level: $scope.levels[0]});
        $scope.todoTask = '';
    }

    $scope.remaining = function () {
        var count = 0;
        angular.forEach($scope.todos, function (todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };

    $scope.completed = function () {
        return $scope.todos.length - $scope.remaining();
    }

    $scope.total = function () {
        return $scope.todos.length;
    }

    $scope.progress = function () {
        return Math.floor($scope.completed() / $scope.total() * 100);
    }

    $scope.archiveOne = function (todo) {
        $scope.todos.splice($scope.todos.indexOf(todo), 1);
        $scope.archive.push(todo);
    }

    $scope.archiveAll = function () {
        var toArchive = $scope.todos.filter(function (todo) {
            return todo.done;
        });

        angular.forEach(toArchive, function (todo) {
            $scope.todos.splice($scope.todos.indexOf(todo), 1);
        });

        $scope.archive = archive.concat(toArchive);
    }

    $scope.changeLevel = function (todo) {
        var index = $scope.levels.indexOf(todo.level);
        todo.level = $scope.levels[(index + 1) % $scope.levels.length];
    }

    $scope.updateTodos = function () {
        localStorage.todos = angular.toJson($scope.todos);
    }

    $scope.updateArchive = function () {
        localStorage.archive = angular.toJson($scope.archive);
    }

    $scope.$watch('todos', $scope.updateTodos, true);
    $scope.$watch('archive', $scope.updateArchive, true);
}]);

TodoApp.controller('ArchiveController', ['$scope', 'TodoFactory', function ($scope, TodoFactory) {
    $scope.archive = TodoFactory.getArchive();

    $scope.updateArchive = function () {
        localStorage.archive = angular.toJson($scope.archive);
    }

    $scope.removeTodo = function (todo) {
        $scope.archive.splice($scope.archive.indexOf(todo), 1);
    }

    $scope.removeAll = function () {
        $scope.archive = [];
    }

    $scope.$watch('archive', $scope.updateArchive, true);
}]);

TodoApp.controller('HeaderController', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});

TodoApp.factory('TodoFactory', function () {
    var Factory = {};

    Factory.getTodos = function () {
        return angular.fromJson(localStorage.todos) || [];
    }

    Factory.getArchive = function () {
        return angular.fromJson(localStorage.archive) || [];
    }

    return Factory;
});