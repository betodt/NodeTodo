angular.module('NodeTodo')

.service('Todo', ['$resource', function($resource) {
	return $resource('/api/todos/:id');
}]);