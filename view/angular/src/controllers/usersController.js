(function () {
	'use strict';

	angular.module('app').controller('usersController', function($scope, $routeParams, usersService, computersService, CONSTANTS, growl, $confirm, $sce) {
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
		vm.removeComputer = removeComputer;

		init();

		function init() {
			getComputers();
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

		function getComputers() {
			computersService.getAllComputers()
				.then(function(response) {
					vm.computers = response.data;
				})
				.catch(function() {
					growl.error('Erro ao buscar os computadores');
				});
		}

		function getUser(userId) {
			usersService.getOneUser(userId)
				.then(function(response) {
					var responseData = response.data;

					// Permite renderizar html na view
					responseData.description = $sce.trustAsHtml(responseData.description);

					vm.form = responseData;
					console.log(vm.form);
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

			// Força a enviar o conteúdo html como string
			vm.form.description = tinyMCE.activeEditor.getContent();

			var ajax = vm[ vm.currentUserId ? 'updateUser' : 'createUser' ](formData);

			ajax.then(function(response) {
				if (response.data.id) {
					vm.ajaxValidationErrors = '';

					// Limpa o formulário na tela de criação e reseta o estado do formulário
					if (!vm.currentUserId) {
						vm.form = {};
						$scope.userForm.$setPristine();
					}

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

			$confirm({text: 'Deseja realmente excluir ' + user.name + '?'})
				.then(function(){
					usersService.deleteUser(user)
						.then(function(response) {
							(response.data) ? growl.success('Usuário deletado com sucesso.') : growl.warning('Nenhum usuário deletado.');

							vm.users.splice(userIndex, 1);
						})
						.catch(function() {
							growl.error('Erro ao apagar o usuário');
						});
				})
				.catch(function(){});
		}

		function removeComputer(user, computer) {
			var computerIndex = vm.form.computers.indexOf(computer);

			$confirm({text: 'Deseja realmente remover o computador ' + computer.id + ' do usuário ' + user.name + '?'})
				.then(function(){
					usersService.removeComputer(user.id, computer.id)
						.then(function(response) {
							(response.data) ? growl.success('Computador removido com sucesso.') : growl.warning('Nenhum computador removido.');

							vm.form.computers.splice(computerIndex, 1);
						})
						.catch(function() {
							growl.error('Erro ao remover o computador deste usuário.');
						});
				})
				.catch(function(){});
		}
	});
})();