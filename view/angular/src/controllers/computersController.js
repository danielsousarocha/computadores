(function () {
	'use strict';

	angular.module('app').controller('computersController', function($scope, $routeParams, computersService, CONSTANTS) {
		var vm = this;

		vm.currentComputerId = $routeParams.id || 0;

		if (vm.currentComputerId) {
			vm.pageTitle = 'Editar Computador';
			vm.ajaxAction = 'Atualizar';
		} else{
			vm.pageTitle = 'Computadores';
			vm.ajaxAction = 'Criar';
		}

		vm.getComputer = getComputer;
		vm.getComputers = getComputers;

		init();

		function init() {
			return vm.currentComputerId ? getComputer(currentComputerId) : getComputers();
		}

		function getComputers() {
			computersService.getAllComputers()
				.then(function(response) {
					vm.computers = response.data;
				})
				.catch(function() {
					console.warn('Erro ao buscar os computadores.');
				});
		}

		function getComputer(computerId) {
			computersService.getOneComputer(computerId)
				.then(function(response) {
					console.log(response);
				})
				.catch(function() {
					console.warn('Erro ao buscar o computador.');
				});
		}
	})

})();