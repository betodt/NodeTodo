angular.module('NodeTodo')

.controller('MainController', ['$resource', function($resource){

	this.todoAPI = $resource('/api/:where/:which', { where: 'todo'});

	this.todos = this.todoAPI.query({ where: 'todos', which: 'test' });



}]);