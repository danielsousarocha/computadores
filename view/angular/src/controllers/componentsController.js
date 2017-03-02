(function () {
	'use strict';

	angular.module('app').controller('componentsController', function($scope, $routeParams, componentsService, CONSTANTS, growl, $confirm) {
		var vm = this;

		vm.currentComponentId = $routeParams.id || 0;

		vm.disableSubmitButton = false;
		vm.ajaxMessage = '';
		vm.ajaxValidationErrors = '';

		if (vm.currentComponentId) {
			vm.pageTitle = 'Editar Componente';
			vm.ajaxAction = 'Atualizar';
		} else{
			vm.pageTitle = 'Componentes';
			vm.ajaxAction = 'Criar';
		}

		vm.getComponent = getComponent;
		vm.getComponents = getComponents;
		vm.updateComponent = updateComponent;
		vm.createComponent = createComponent;
		vm.submitComponent = submitComponent;
		vm.removeComponent = removeComponent;

		init();

		function init() {
			return vm.currentComponentId ? getComponent(vm.currentComponentId) : getComponents();
		}

		function getComponents() {
			componentsService.getAllComponents()
				.then(function(response) {
					vm.components = response.data;
				})
				.catch(function() {
					growl.error('Erro ao buscar os computadores.');
				});
		}

		function getComponent(componentId) {
			componentsService.getOneComponent(componentId)
				.then(function(response) {
					var responseData = response.data;

					responseData.component_type_id = parseInt(responseData.component_type_id);

					vm.form = responseData;
				})
				.catch(function() {
					growl.error('Erro ao buscar o computador.');
				});
		}

		function submitComponent(formData) {
			vm.disableSubmitButton = true;
			vm.ajaxMessage = 'Processando...';

			var ajax = vm[ vm.currentComponentId ? 'updateComponent' : 'createComponent' ](formData);

			ajax.then(function(response) {
				if (response.data.id) {
					vm.ajaxValidationErrors = '';

					// Limpa o formulário na tela de edição
					if (!vm.currentComponentId) vm.form = {};
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

		function updateComponent(formData) {
			return componentsService.updateComponent(formData);
		}

		function createComponent(formData) {
			return componentsService.createComponent(formData);
		}

		function removeComponent(component) {

			var componentIndex = vm.components.indexOf(component);

			$confirm({text: 'Deseja realmente excluir ' + component.model + '?'})
				.then(function() {
					componentsService.removeComponent(component)
						.then(function(response) {
							(response.data) ? growl.success('Componente deletado com sucesso.') : growl.warning('Nenhum componente deletado.');

							vm.components.splice(componentIndex, 1);
						})
						.catch(function() {
							growl.error('Erro ao apagar o componente');
						})
				})
				.catch(function(){});
		}
	})

})();