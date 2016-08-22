angular.module('NodeTodo')

.controller('MainController', ['$resource', 'Todo', function($resource, Todo){

	this.todos = Todo.query();

	this.addTodo = function(todo) {

		if(todo) {

			Todo.save({
				
				todo: todo,
				isDone: true,
				hasAttachment: true
			
			}, function() {

				this.todos = Todo.query();
				console.log(this.todos);
			
			});

		}

	};

}]);