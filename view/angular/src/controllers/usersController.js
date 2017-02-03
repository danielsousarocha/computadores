(function () {
	'use strict';

	angular.module("app").controller('usersController', function($http) {
		var vm = this;

		vm.pageTitle = 'Usuários';
		vm.users = [];
		vm.getUsers = getUsers;
		vm.removeUser = removeUser;

		init();

		function init() {
			return vm.getUsers();
		}

		function getUsers() {
			$http.get('http://localhost:8000/users')
				.then(function(response) {
					vm.users = response.data;
				})
				.catch(function() {
					console.warn('Erro ao buscar os usuários.');
				});

			return vm.users;
		}

		function removeUser(userId) {
			if (confirm('Deseja realmente excluir este usuário?')) {
				console.log(userId);
				$http.delete('http://localhost:8000/user/' + userId)
					.then(function(response) {
						(response.data) ? alert('Usuário deletado com sucesso.') : alert('Nenhum usuário deletado.');
						vm.users.pop();
					})
					.catch(function() {
						console.warn('Erro ao apagar o usuário');
					});
			}
		}
	});
})();
