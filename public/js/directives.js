angular.module('NodeTodo')

.directive('todoList', function() {
	return {
		restrict: 'E',
		templateUrl: '/assets/directives/todoList.html',
		replace: true,
		scope: {
			user: '=',
			todos: '=',
			submit: '&',
			check: '&',
			attach: '&',
			signIn: '&',
			om: '&'
		}
	};
});