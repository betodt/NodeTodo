angular.module('NodeTodo', ['ngMaterial', 'ngResource'])

.config(['$mdThemingProvider', function($mdThemingProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('brown')
		.accentPalette('grey')
		.warnPalette('amber')
		.backgroundPalette('blue-grey');
}]);