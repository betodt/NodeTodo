angular.module('NodeTodo', ['ngMaterial', 'ngResource', 'ngRoute', 'ngMessages'])

.config(['$mdThemingProvider', '$routeProvider', function($mdThemingProvider, $routeProvider) {
	
	$mdThemingProvider
		.theme('default')
			.primaryPalette('indigo')
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