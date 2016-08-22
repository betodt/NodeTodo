angular.module('NodeTodo')

.controller('MainController', ['$resource', function($resource){

	// Place resource in a service/factory

	this.todoAPI = $resource('/api/todos/:id');

	this.todos = this.todoAPI.query();

}]);