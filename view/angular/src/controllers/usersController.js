(function () {
	'use strict';

	angular.module("app").controller('usersController', function($scope, $http, $routeParams) {
		var vm = this;

		vm.currentUserId = $routeParams.id || 0;

		vm.disableSubmitButton = false;
		vm.ajaxMessage = '';
		vm.ajaxValidation = '';
		vm.ajaxValidationErrors = '';

		if (vm.currentUserId) {
			vm.pageTitle = 'Editar Usuário';
			vm.ajaxAction = 'Atualizar';
		} else{
			vm.pageTitle = 'Usuários';
			vm.ajaxAction = 'Criar';
		}

		vm.getUser = getUser;
		vm.getUsers = getUsers;
		vm.updateUser = updateUser;
		vm.createUser = createUser;
		vm.submitUser = submitUser;
		vm.removeUser = removeUser;

		init();

		function init() {
			return vm.currentUserId ? vm.getUser(vm.currentUserId) : vm.getUsers();
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

		function getUser(userId) {
			$http.get('http://localhost:8000/user/' + userId)
				.then(function(response) {
					vm.form = response.data;
				})
				.catch(function() {
					console.warn('Erro ao buscar o usuário.');
				});
		}

		function createUser(formData) {
			return $http.post('http://localhost:8000/users', formData);
		}

		function updateUser(formData) {
			return $http.put('http://localhost:8000/user/' + formData.id, formData);
		}

		function submitUser(formData) {
			vm.disableSubmitButton = true;
			vm.ajaxMessage = 'Processando...';
			vm.ajaxValidation = '';

			var ajax = vm.currentUserId ? vm.updateUser(formData) : vm.createUser(formData);

			ajax.then(function(response) {
				if (response.data.id) {
					vm.ajaxMessage = 'Processo finalizado com sucesso';
					vm.ajaxValidation = 'text-success';
					vm.ajaxValidationErrors = '';

					if (!vm.currentUserId) vm.form = {};

				} else {
					vm.ajaxMessage = 'Ocorreu um erro durante a validação dos dados';
					vm.ajaxValidation = 'text-warning';
					vm.ajaxValidationErrors = response.data;
				}
			})
			.catch(function() {
				vm.ajaxMessage = 'Ocorreu um erro no servidor.';
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