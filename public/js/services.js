angular.module('NodeTodo')

.service('Todo', ['$resource', function($resource) {
	return $resource('/api/todos/:id', null, {
		'update': { method: 'PUT' }
	});
}])

.service('Auth', ['$http', function($http) {
	return {
		signUp: function(username, password, cb) {
			// call api/signUp
			$http.post('/api/signUp', { 
				name: username, 
				password: password 
			}).then(function(res) {
				cb(null, res);
			}, function(err){ 
				cb(err, null); 
			});
		},
		login: function(username, password, cb) {
			// call api/authenticate
			$http.post('/api/authenticate', {
				username: username,
				password: password
			}).then(function(res) {
				cb(null, res);
			}, function(err){ 
				cb(err, err); 
			});
		}
	};
}])

.factory('isUsernameAvailable', ['$q', '$http', function($q, $http){
	return function(username){
		if(username) {
			var deferred = $q.defer();
 	
			$http.get('/api/users/' + username).then(function(){
				// user found, not unique
				deferred.reject();
			}, function() {
				// not found, unique
				deferred.resolve();
			});

			return deferred.promise;
		}
	};
}]);