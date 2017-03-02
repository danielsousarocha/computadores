(function () {

	angular.module('app').factory('componentsService', function($http, CONSTANTS) {
		var _getAllComponents = function() {
			return $http.get(CONSTANTS.API.GET_ALL_COMPONENTS);
		};

		var _getOneComponent = function(componentId) {
			return $http.get(CONSTANTS.API.GET_ONE_COMPONENT + componentId);
		};

		var _createComponent = function(formData) {
			return $http.post(CONSTANTS.API.CREATE_COMPONENT, formData);
		};

		var _updateComponent = function(formData) {
			return $http.put(CONSTANTS.API.UPDATE_COMPONENT + formData.id, formData);
		};

		var _removeComponent = function(component) {
			return $http.delete(CONSTANTS.API.DELETE_COMPONENT + component.id);
		};

		return {
			getAllComponents: _getAllComponents,
			getOneComponent: _getOneComponent,
			createComponent: _createComponent,
			updateComponent: _updateComponent,
			removeComponent: _removeComponent
		}
	});

})();