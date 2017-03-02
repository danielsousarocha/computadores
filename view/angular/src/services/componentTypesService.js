(function () {

	angular.module('app').factory('ComponentTypesService', function($http, CONSTANTS) {
		var _getAllComponentTypes = function() {
			return $http.get(CONSTANTS.API.GET_ALL_COMPONENT_TYPES);
		};

		var _getOneComponentType = function(ComponentTypeId) {
			return $http.get(CONSTANTS.API.GET_ONE_COMPONENT_TYPE + ComponentTypeId);
		};

		var _createComponentType = function(formData) {
			return $http.post(CONSTANTS.API.CREATE_COMPONENT_TYPE, formData);
		};

		var _updateComponentType = function(formData) {
			return $http.put(CONSTANTS.API.UPDATE_COMPONENT_TYPE + formData.id, formData);
		};

		var _removeComponentType = function(ComponentType) {
			return $http.delete(CONSTANTS.API.DELETE_COMPONENT_TYPE + ComponentType.id);
		};

		return {
			getAllComponentTypes: _getAllComponentTypes,
			getOneComponentType: _getOneComponentType,
			createComponentType: _createComponentType,
			updateComponentType: _updateComponentType,
			removeComponentType: _removeComponentType
		}
	});

})();