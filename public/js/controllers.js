angular.module('NodeTodo')

.controller('MainController', ['$scope', '$resource', '$mdDialog', 'Todo', 
	function($scope, $resource, $mdDialog, Todo){

		this.user = {};
		
		this.todos = Todo.query({ uname: this.user.username });

		this.addTodo = function(todo) {

			console.log(this.user);

			if(todo) {

				if(this.user._id) {

					var self = this;

					new Todo({
						
						userId: this.user._id,
						todo: todo,
						isDone: false,
						hasAttachment: false
					
					}).$save(function(newTodo) {

						self.todos = Todo.query({ userId: self.user._id });
					
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

			if(this.user._id) {
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
		    
		    }).then(function(user) {
		    	self.user = user;
		    	self.todos = Todo.query({ userId: self.user._id });
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
		    
		    }).then(function(user) {
		    	self.user = user;
		    	self.todos = Todo.query({ userId: self.user._id });
		    });

		    originatorEv = null;
		};
	}
])

.controller('SignInController', ['$mdDialog', 'Auth',
	function($mdDialog, Auth) {

		this.messages = { incorrectPassword: false };

		this.cancel = function() {
			$mdDialog.cancel();
		};
		this.signIn = function(isValid) {	
			var self = this;

			if(isValid) {
				Auth.login(this.uname, this.pwd, function(err, res) {
					
					if(err) {
						self.messages.incorrectPassword = true;
					}
					
					if(res.status === 200) {
						$mdDialog.hide(res.data);
					}
				});
			}
		};
	}
])

.controller('SignUpController', ['$mdDialog', 'Auth', 
	function($mdDialog, Auth) {
		this.cancel = function() {
			$mdDialog.cancel();
		};
		this.signUp = function(isValid) {
			var self = this;

			if(isValid) {
		    	Auth.signUp(this.uname, this.pwd, function(err, res) {
		    		if(err) throw err;

		    		if(res.data.success) {
		    			// if successfully registered, log user in
			    		Auth.login(self.uname, self.pwd, function(err, res) {
			    			if(err) throw err;
			    			
			    			if(res.status === 200) {
			    				// on successful login, close login prompt
			    				$mdDialog.hide(res.data);
			    			} else {
			    				console.log(res.status);
			    				this.message = "Incorrect email/password";
			    			}
			    		});

		    		} else {
		    			// output error message
		    			this.message = res.data.msg;
		    		}
		    	});
			}
		};
	}
]);