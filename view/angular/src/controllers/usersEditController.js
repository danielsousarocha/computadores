(function () {
	'use strict';

	angular.module('app').controller('usersEditController', function($scope, $http, $routeParams) {
		var vm = this;

		vm.pageTitle = 'Editar Usuário';
		vm.currentUserId = $routeParams.id;
		vm.getUser = getUser;

		init();

		function init() {
			return vm.getUser(vm.currentUserId);
		}

		function getUser(userId) {
			$http.get('http://localhost:8000/user/' + userId)
				.then(function(response) {
					console.log(response.data);
				})
				.catch(function() {
					console.warn('Erro ao buscar o usuário.')
				});
		}
	});
})();