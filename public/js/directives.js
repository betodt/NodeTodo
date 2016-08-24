angular.module('NodeTodo')

.directive('todoList', function() {
	return {
		restrict: 'E',
		templateUrl: '/assets/directives/todoList.html',
		replace: true,
		scope: {
			todos: '=',
			submit: '&',
			check: '&',
			attach: '&'
		}
	};
});