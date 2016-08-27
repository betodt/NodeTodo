angular.module('NodeTodo')

.directive('compareTo', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		scope: {
			otherModelValue: "=compareTo"
		},
		link: function(scope, element, attributes, ngModel) {

			ngModel.$validators.compareTo = function(modelValue) {
				if(scope.otherModelValue) {
					return modelValue === scope.otherModelValue.$modelValue;
				}
			}

			scope.$watch('otherModelValue', function() {
				ngModel.$validate();
			});
		}
	};
})

.directive('uniqueUsername', ['isUsernameAvailable', function(isUsernameAvailable) {
	return { 
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attributes, ngModel) {
			ngModel.$asyncValidators.unique = isUsernameAvailable;
		}
	};

}]);