function TodoApp ($scope) {
	$scope.todos = angular.fromJson(localStorage.todos);
	$scope.todoArchive = [];

	$scope.todoCount = $scope.todos.length + 1;

	$scope.addTodo = function () {
		$scope.todos.push({task: $scope.todoTask, done: false, count: $scope.todoCount++});
		$scope.todoTask = '';
	}

	$scope.doneTodo = function (todo) {
		todo.done = !todo.done
		$scope.saveTodos();
	}

	$scope.saveTodos = function () {
		localStorage.todos = angular.toJson($scope.todos);
	}

	$scope.saveArchive = function () {
		localStorage.todoArchive = angular.toJson($scope.todoArchive);
	}

	$scope.removeTodo = function (todo) {
		$scope.todos.splice($scope.todos.indexOf(todo), 1);
		$scope.saveTodos();
	}

	$scope.remaining = function() {
	    var count = 0;
	    angular.forEach($scope.todos, function(todo) {
	      count += todo.done ? 0 : 1;
	    });
	    return count;
    };

  	$scope.archive = function() {
	    angular.forEach($scope.todos, function(todo) {
	      if (todo.done) {
	      	var archTodo = $scope.todos.splice($scope.todos.indexOf(todo), 1);
	      	$scope.todoArchive = $scope.todoArchive.concat(archTodo);
	      }
	    });
	    $scope.saveArchive();
	    $scope.saveTodos();
  	};
}