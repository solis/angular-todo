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
	$scope.todos = angular.fromJson(localStorage.todos);

	$scope.addTodo = function () {
		$scope.todos.push({task: $scope.todoTask, done: false});
		$scope.todoTask = '';
	}

	$scope.doneTodo = function (todo) {
		todo.done = !todo.done
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

  	$scope.archive = function() {
  		var todoArchive = [];
	    angular.forEach($scope.todos, function(todo) {
	      if (todo.done) {
	      	var archTodo = $scope.todos.splice($scope.todos.indexOf(todo), 1);
	      	todoArchive = $scope.todoArchive.concat(archTodo);
	      }
	    });
	    localStorage.todoArchive = angular.toJson(todoArchive);
	    $scope.saveTodos();
  	};
})

.controller('ArchiveController', function($scope) {
	$scope.todoArchive = angular.fromJson(localStorage.todoArchive);;

	$scope.removeTodo = function (todo) {
		$scope.todoArchive.splice($scope.todoArchive.indexOf(todo), 1);
		localStorage.todoArchive = angular.toJson($scope.todoArchive);
	}
})

.controller('HeaderController', function($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
})