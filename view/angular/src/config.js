(function () {
	'use strict';

	angular.module('app').run(function($confirmModalDefaults) {
		$confirmModalDefaults.defaultLabels.title = 'Exclusão de Registro';
		$confirmModalDefaults.defaultLabels.ok = 'Sim';
		$confirmModalDefaults.defaultLabels.cancel = 'Não';
	});

})();