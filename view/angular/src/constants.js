(function () {
	'use strict';

	var baseApiUrl = "http://localhost:8000";

	angular.module("app").value("CONSTANTS", {
		API: {
			GET_ALL_USERS: baseApiUrl + '/users',
			GET_ONE_USER: baseApiUrl + '/user/',
			CREATE_USER: baseApiUrl + '/users',
			UPDATE_USER: baseApiUrl + '/user/',
			DELETE_USER: baseApiUrl + '/user/'
		}
	});

})();