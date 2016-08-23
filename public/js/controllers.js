angular.module('NodeTodo')

.controller('MainController', ['$scope', '$resource', 'Todo', function($scope, $resource, Todo){

	this.todos = Todo.query();

	this.addTodo = function(todo) {

		if(todo) {

			var self = this;

			new Todo({
				
				todo: todo,
				isDone: false,
				hasAttachment: false
			
			}).$save(function(newTodo) {

				self.todos = Todo.query();
			
			});

		}

	};

	this.checkTask = function(todo) {

		Todo.update({ id: todo._id }, todo);

	};

	this.addAttachment = function() {

		console.log('attached');

	};

}]);