angular.module('NodeTodo', ['ngMaterial', 'ngResource', 'ngRoute'])

.config(['$mdThemingProvider', '$routeProvider', function($mdThemingProvider, $routeProvider) {
	
	$mdThemingProvider

		.theme('default')
			.primaryPalette('brown')
			.accentPalette('grey')
			.warnPalette('amber')
			.backgroundPalette('grey');

	$routeProvider

		.when('/', {
			templateUrl: '/assets/views/todoList.html',
			controller: 'MainController',
			controllerAs: 'vm'
		});

}]);