(function () {
	'use strict';

	angular.module('app').controller('usersController', function($scope, $routeParams, usersService, CONSTANTS, growl) {
		var vm = this;

		vm.currentUserId = $routeParams.id || 0;

		vm.disableSubmitButton = false;
		vm.ajaxMessage = '';
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
			usersService.getAllUsers()
				.then(function(response) {
					vm.users = response.data;
				})
				.catch(function() {
					growl.error('Erro ao buscar os usuários.');
				});

			return vm.users;
		}

		function getUser(userId) {
			usersService.getOneUser(userId)
				.then(function(response) {
					vm.form = response.data;
				})
				.catch(function() {
					growl.error('Erro ao buscar o usuário.');
				});
		}

		function createUser(formData) {
			return usersService.createUser(formData);
		}

		function updateUser(formData) {
			return usersService.updateUser(formData);
		}

		function submitUser(formData) {
			vm.disableSubmitButton = true;
			vm.ajaxMessage = 'Processando...';

			var ajax = vm[ vm.currentUserId ? 'updateUser' : 'createUser' ](formData);

			ajax.then(function(response) {
				if (response.data.id) {
					vm.ajaxValidationErrors = '';

					// Limpa o formulário na tela de edição
					if (!vm.currentUserId) vm.form = {};
					growl.success('Processo finalizado com sucesso.');

				} else {
					vm.ajaxValidationErrors = response.data.errors;
					growl.warning('Ocorreu um erro durante a validação dos dados.');
				}
			})
			.catch(function() {
				growl.error('Ocorreu um erro no servidor.');
			})
			.finally(function() {
				vm.ajaxMessage = '';
				vm.disableSubmitButton = false;
			});
		}

		function removeUser(user) {

			var userIndex = vm.users.indexOf(user);

			if (confirm('Deseja realmente excluir este usuário?')) {
				usersService.deleteUser(user)
					.then(function(response) {
						('Computadores buscados com sucesso.');
						(response.data) ? growl.success('Usuário deletado com sucesso.') : growl.warning('Nenhum usuário deletado.');

						vm.users.splice(userIndex, 1);
					})
					.catch(function() {
						growl.error('Erro ao apagar o usuário');
					});
			}
		}
	});
})();