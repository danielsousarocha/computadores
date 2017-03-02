(function () {
	'use strict';

	angular.module('app').controller('componentTypesController', function($scope, $routeParams, ComponentTypesService, CONSTANTS, growl, $confirm) {
		var vm = this;

		vm.currentComponentTypeId = $routeParams.id || 0;

		vm.disableSubmitButton = false;
		vm.ajaxMessage = '';
		vm.ajaxValidationErrors = '';

		if (vm.currentComponentTypeId) {
			vm.pageTitle = 'Editar Tipo de Componente';
			vm.ajaxAction = 'Atualizar';
		} else{
			vm.pageTitle = 'Tipos de Componentes';
			vm.ajaxAction = 'Criar';
		}

		vm.getComponentType = getComponentType;
		vm.getComponentTypes = getComponentTypes;
		vm.updateComponentType = updateComponentType;
		vm.createComponentType = createComponentType;
		vm.submitComponentType = submitComponentType;
		vm.removeComponentType = removeComponentType;

		init();

		function init() {
			return vm.currentComponentTypeId ? getComponentType(vm.currentComponentTypeId) : getComponentTypes();
		}

		function getComponentTypes() {
			ComponentTypesService.getAllComponentTypes()
				.then(function(response) {
					vm.componentTypes = response.data;
				})
				.catch(function() {
					growl.error('Erro ao buscar os computadores.');
				});
		}

		function getComponentType(componentTypeId) {
			ComponentTypesService.getOneComponentType(componentTypeId)
				.then(function(response) {
					vm.form = response.data;
				})
				.catch(function() {
					growl.error('Erro ao buscar o computador.');
				});
		}

		function submitComponentType(formData) {
			vm.disableSubmitButton = true;
			vm.ajaxMessage = 'Processando...';

			var ajax = vm[ vm.currentComponentTypeId ? 'updateComponentType' : 'createComponentType' ](formData);

			ajax.then(function(response) {
				if (response.data.id) {
					vm.ajaxValidationErrors = '';

					// Limpa o formulário na tela de edição
					if (!vm.currentComponentTypeId) vm.form = {};
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

		function updateComponentType(formData) {
			return ComponentTypesService.updateComponentType(formData);
		}

		function createComponentType(formData) {
			return ComponentTypesService.createComponentType(formData);
		}

		function removeComponentType(componentType) {

			var componentTypeIndex = vm.componentTypes.indexOf(componentType);

			$confirm({text: 'Deseja realmente excluir ' + componentType.name + '?'})
				.then(function() {
					ComponentTypesService.removeComponentType(componentType)
						.then(function(response) {
							(response.data) ? growl.success('Tipo de Componente deletado com sucesso.') : growl.warning('Nenhum Tipo de Componente deletado.');

							vm.componentTypes.splice(componentTypeIndex, 1);
						})
						.catch(function() {
							growl.error('Erro ao apagar o Tipo de Componente');
						})
				})
				.catch(function(){});
		}
	})

})();