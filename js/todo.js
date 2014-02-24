/**
* todoapp Module
*
* Description
*/
angular.module('todoapp', ['ngRoute'])

.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'ListController',
			templateUrl: 'todo.html'
		})
		.when('/archive', {
			controller: 'ArchiveController',
			templateUrl: 'archive.html'
		})
		.otherwise({
	    	redirectTo:'/'
	    });
})

.controller('ListController', function($scope){
	$scope.todos = angular.fromJson(localStorage.todos) || [];
	$scope.levels = ['default', 'primary', 'info', 'warning', 'danger'];

	$scope.addTodo = function () {
		$scope.todos.push({task: $scope.todoTask, done: false, level: $scope.levels[0]});
		$scope.todoTask = '';
	}

	$scope.doneTodo = function (todo) {
		todo.done = !todo.done;
		$scope.saveTodos();
	}

	$scope.saveTodos = function () {
		localStorage.todos = angular.toJson($scope.todos);
	}

	$scope.remaining = function() {
	    var count = 0;
	    angular.forEach($scope.todos, function(todo) {
	      count += todo.done ? 0 : 1;
	    });
	    return count;
    };

    $scope.completed = function() {
    	return $scope.todos.length - $scope.remaining();
    }

    $scope.total = function() {
    	return $scope.todos.length;
    }

    $scope.progress = function() {
    	return Math.floor($scope.completed() / $scope.total() * 100);
    }

    $scope.archive = function (todo) {
    	$scope.todos.splice($scope.todos.indexOf(todo), 1);
    	var todoArchive = angular.fromJson(localStorage.todoArchive);
    	todoArchive.push(todo);
    	localStorage.todoArchive = angular.toJson(todoArchive);
    	$scope.saveTodos();
    }

  	$scope.archiveAll = function() {
  		var toArchive = $scope.todos.filter(function(todo) {
  			return todo.done;
  		});

	    angular.forEach(toArchive, function(todo) {
	    	$scope.todos.splice($scope.todos.indexOf(todo), 1);
	    });

	    var todoArchive = angular.fromJson(localStorage.todoArchive) || [];;
	    todoArchive = todoArchive.concat(toArchive);
	    localStorage.todoArchive = angular.toJson(todoArchive);
	    $scope.saveTodos();
  	}

  	$scope.changeLevel = function(todo) {
  		var index = $scope.levels.indexOf(todo.level);
  		todo.level = $scope.levels[(index + 1) % $scope.levels.length];
  		$scope.saveTodos();
  	}
})

.controller('ArchiveController', function($scope) {
	$scope.todoArchive = angular.fromJson(localStorage.todoArchive);

	$scope.saveArchive = function() {
		localStorage.todoArchive = angular.toJson($scope.todoArchive);
	}

	$scope.removeTodo = function(todo) {
		$scope.todoArchive.splice($scope.todoArchive.indexOf(todo), 1);
		$scope.saveArchive();
	}

	$scope.removeAll = function() {
		$scope.todoArchive = [];
		$scope.saveArchive();
	}
})

.controller('HeaderController', function($scope, $location) {
    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
})