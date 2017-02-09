(function () {
	'use strict';

	angular.module('app').controller('usersEditController', function($scope, $http, $routeParams) {
		var vm = this;

		vm.currentUserId = $routeParams.id;

		vm.pageTitle = 'Editar Usuário';
		vm.disableSubmitButton = false;
		vm.ajaxMessage = '';
		vm.ajaxValidation = '';
		vm.ajaxValidationErrors = '';
		vm.ajaxAction = 'Atualizar';

		vm.getUser = getUser;
		vm.submitUser = submitUser;

		init();

		function init() {
			return vm.getUser(vm.currentUserId);
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

		function submitUser(formData) {
			vm.disableSubmitButton = true;
			vm.ajaxMessage = 'Atualizando...';
			vm.ajaxValidation = '';

			$http.put('http://localhost:8000/user/' + formData.id, formData)
				.then(function(response) {
					if (response.data.id) {
						vm.ajaxMessage = 'Usuário atualizado com sucesso';
						vm.ajaxValidation = 'text-success';
						vm.ajaxValidationErrors = '';
					} else {
						vm.ajaxMessage = 'O usuário não foi atualizado';
						vm.ajaxValidation = 'text-warning';
						vm.ajaxValidationErrors = response.data;
					}
				})
				.catch(function() {
					vm.ajaxMessage = 'Erro ao atualizar o usuário';
					vm.ajaxValidation = 'text-danger';
				})
				.finally(function() {
					vm.disableSubmitButton = false;
				});
		}
	});
})();