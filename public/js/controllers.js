angular.module('NodeTodo')

.controller('MainController', ['$scope', '$resource', '$mdDialog', 'Todo', function($scope, $resource, $mdDialog, Todo){

	this.user = { uname: '' };
	
	this.todos = Todo.query({ uname: this.user.uname });

	console.log(this.todos);

	this.addTodo = function(todo) {

		console.log(this.user.uname)

		if(todo) {

			if(this.user.uname) {

				var self = this;

				new Todo({
					
					username: this.user.uname,
					todo: todo,
					isDone: false,
					hasAttachment: false
				
				}).$save(function(newTodo) {

					self.todos = Todo.query({ uname: self.user.uname });
				
				});

			} else {
				
				this.todos.push({
					
					todo: todo,
					isDone: false,
					hasAttachment: false
				
				});
			
			}
		
		}
	
	};

	this.checkTask = function(todo) {

		if(this.user.uname) {
			Todo.update({ id: todo._id }, todo);
		}

	};

	this.addAttachment = function() {

		console.log('attached');

	};


	// need to track event for menu
	// and popup targets
	var originatorEv;

	this.openMenu = function($mdOpenMenu, ev) {
		console.log('open openMenu');
		originatorEv = ev;
		$mdOpenMenu(ev);
	};

	// Sign in prompt
	this.showSignIn = function() {
		var self = this;

	    $mdDialog.show({
	    	
	    	controller: 'SignInController',
	    	controllerAs: 'dialog',
	    	templateUrl: '/assets/templates/signIn.html',
	    	targetEvent: originatorEv
	    
	    }).then(function(uname, pwd) {
	    	self.user.uname = uname;
	    	self.todos = Todo.query({ uname: self.user.uname });
	    });

	    originatorEv = null;
	};

	// Sign up prompt
	this.showSignUp = function() {
		var self = this;

	    $mdDialog.show({
	    	
	    	controller: 'SignUpController',
	    	controllerAs: 'dialog',
	    	templateUrl: '/assets/templates/signUp.html',
	    	targetEvent: originatorEv
	    
	    }).then(function(uname, pwd) {
	    	self.user.uname = uname;
	    	self.todos = Todo.query({ uname: self.user.uname });
	    });

	    originatorEv = null;
	};

}])

.controller('SignInController', ['$mdDialog', function($mdDialog) {
	this.cancel = function() {
		$mdDialog.cancel();
	};
	this.signIn = function() {
		$mdDialog.hide(this.uname, this.pwd);
	};
}])

.controller('SignUpController', ['$mdDialog', function($mdDialog) {
	this.cancel = function() {
		$mdDialog.cancel();
	};
	this.signUp = function() {
		$mdDialog.hide(this.uname, this.pwd);
	};
}]);