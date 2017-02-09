(function () {
	'use strict';

	angular.module("app").controller('usersController', function($scope, $http) {
		var vm = this;

		vm.pageTitle = 'Usuários';
		vm.disableSubmitButton = false;
		vm.ajaxMessage = '';
		vm.ajaxValidation = '';
		vm.ajaxValidationErrors = '';
		vm.ajaxAction = 'Criar';

		vm.getUsers = getUsers;
		vm.submitUser = submitUser;
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

		function submitUser(formData) {
			vm.disableSubmitButton = true;
			vm.ajaxMessage = 'Cadastrando...';
			vm.ajaxValidation = '';

			$http.post('http://localhost:8000/users', formData)
				.then(function(response) {
					if (response.data.id) {
						vm.ajaxMessage = 'Usuário criado com sucesso';
						vm.ajaxValidation = 'text-success';
						vm.form = {};
					} else {
						vm.ajaxMessage = 'O usuário não foi criado';
						vm.ajaxValidation = 'text-warning';
						vm.ajaxValidationErrors = response.data;
					}
				})
				.catch(function() {
					vm.ajaxMessage = 'Erro ao criar um usuário';
					vm.ajaxValidation = 'text-danger';
				})
				.finally(function() {
					vm.disableSubmitButton = false;
				});
		}

		function removeUser(userId) {
			if (confirm('Deseja realmente excluir este usuário?')) {
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
