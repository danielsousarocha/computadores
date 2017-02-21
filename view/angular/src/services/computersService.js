(function () {

	angular.module('app').factory('computersService', function($http, CONSTANTS) {
		var _getAllComputers = function() {
			return $http.get(CONSTANTS.API.GET_ALL_COMPUTERS);
		}

		var _getOneComputer = function(computerId) {
			return $http.get(CONSTANTS.API.GET_ONE_COMPUTER + computerId);
		}

		return {
			getAllComputers: _getAllComputers,
			getOneComputer: _getOneComputer
		}
	});

})();