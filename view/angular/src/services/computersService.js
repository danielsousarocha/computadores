(function () {

	angular.module('app').factory('computersService', function($http, CONSTANTS) {
		var _getAllComputers = function() {
			return $http.get(CONSTANTS.API.GET_ALL_COMPUTERS);
		};

		var _getOneComputer = function(computerId) {
			return $http.get(CONSTANTS.API.GET_ONE_COMPUTER + computerId);
		};

		var _createComputer = function(formData) {
			return $http.post(CONSTANTS.API.CREATE_COMPUTER, formData);
		};

		var _updateComputer = function(formData) {
			console.log(formData);
			return $http.put(CONSTANTS.API.UPDATE_COMPUTER + formData.id, formData);
		};

		var _removeComputer = function(computer) {
			return $http.delete(CONSTANTS.API.DELETE_COMPUTER + computer.id);
		};

		return {
			getAllComputers: _getAllComputers,
			getOneComputer: _getOneComputer,
			createComputer: _createComputer,
			updateComputer: _updateComputer,
			removeComputer: _removeComputer
		}
	});

})();