angular.module('NodeTodo')

.directive('todoList', function() {
	return {
		restrict: 'E',
		templateUrl: '/assets/directives/todoList.html',
		replace: true,
		scope: {
			todos: '='
		}
	};
})

.directive('todoItem', function() {
	return {
		restrict: 'E',
		templateUrl: '/assets/directives/todoItem.html',
		replace: true,
		scope: {
			todo: '='
		}
	};
});