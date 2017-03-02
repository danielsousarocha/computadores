(function () {
	'use strict';

	angular.module('app').controller('computersController', function($scope, $routeParams, computersService, CONSTANTS, growl, $confirm) {
		var vm = this;

		vm.currentComputerId = $routeParams.id || 0;

		vm.disableSubmitButton = false;
		vm.ajaxMessage = '';
		vm.ajaxValidationErrors = '';

		if (vm.currentComputerId) {
			vm.pageTitle = 'Editar Computador';
			vm.ajaxAction = 'Atualizar';
		} else{
			vm.pageTitle = 'Computadores';
			vm.ajaxAction = 'Criar';
		}

		vm.getComputer = getComputer;
		vm.getComputers = getComputers;
		vm.updateComputer = updateComputer;
		vm.createComputer = createComputer;
		vm.submitComputer = submitComputer;
		vm.removeComputer = removeComputer;

		init();

		function init() {
			return vm.currentComputerId ? getComputer(vm.currentComputerId) : getComputers();
		}

		function getComputers() {
			computersService.getAllComputers()
				.then(function(response) {
					vm.computers = response.data;
				})
				.catch(function() {
					growl.error('Erro ao buscar os computadores.');
				});
		}

		function getComputer(computerId) {
			computersService.getOneComputer(computerId)
				.then(function(response) {
					vm.form = response.data;
				})
				.catch(function() {
					growl.error('Erro ao buscar o computador.');
				});
		}

		function submitComputer(formData) {
			vm.disableSubmitButton = true;
			vm.ajaxMessage = 'Processando...';

			var ajax = vm[ vm.currentComputerId ? 'updateComputer' : 'createComputer' ](formData);

			ajax.then(function(response) {
				if (response.data.id) {
					vm.ajaxValidationErrors = '';

					// Limpa o formulário na tela de edição
					if (!vm.currentComputerId) vm.form = {};
					growl.success('Processo finalizado com sucesso');
				} else {
					vm.ajaxValidationErrors = response.data.errors;
					growl.warning('Ocorreu um erro durante a validação dos dados.');
				}
			})
			.catch(function(response) {
				growl.error('Ocorreu um erro no servidor');
			})
			.finally(function() {
				vm.disableSubmitButton = false;
				vm.ajaxMessage = '';
			});
		}

		function updateComputer(formData) {
			return computersService.updateComputer(formData);
		}

		function createComputer(formData) {
			return computersService.createComputer(formData);
		}

		function removeComputer(computer) {

			var computerIndex = vm.computers.indexOf(computer);

			$confirm({text: 'Deseja realmente excluir ' + computer.name + '?'})
				.then(function() {
					computersService.removeComputer(computer)
						.then(function(response) {
							(response.data) ? growl.success('Computador deletado com sucesso.') : growl.warning('Nenhum computador deletado.');

							vm.computers.splice(computerIndex, 1);
						})
						.catch(function() {
							growl.error('Erro ao apagar o computador');
						})
				})
				.catch(function(){});
		}
	})

})();