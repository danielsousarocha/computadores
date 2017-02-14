(function () {

	angular.module("app").factory('usersService', function($http, CONSTANTS) {
		var _getAllUsers = function() {
			return $http.get(CONSTANTS.API.GET_ALL_USERS);
		};

		var _getOneUser = function(userId) {
			return $http.get(CONSTANTS.API.GET_ONE_USER + userId);
		};

		var _createUser = function(formData) {
			return $http.post(CONSTANTS.API.CREATE_USER, formData);
		};

		var _updateUser = function(formData) {
			return $http.put(CONSTANTS.API.UPDATE_USER + formData.id, formData);
		};

		var _deleteUser = function(user) {
			return $http.delete(CONSTANTS.API.DELETE_USER + user.id);
		};

		return {
			getAllUsers: _getAllUsers,
			getOneUser: _getOneUser,
			createUser: _createUser,
			updateUser: _updateUser,
			deleteUser: _deleteUser
		};
	});

})();