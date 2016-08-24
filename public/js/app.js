angular.module('NodeTodo', ['ngMaterial', 'ngResource'])

.config(['$mdThemingProvider', function($mdThemingProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('indigo')
		.accentPalette('grey')
		.warnPalette('amber')
		.backgroundPalette('grey');
}]);