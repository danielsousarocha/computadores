(function () {
	'use strict';

	angular.module('app')
		.run(function($confirmModalDefaults) {
			$confirmModalDefaults.defaultLabels.title = 'Exclusão de Registro';
			$confirmModalDefaults.defaultLabels.ok = 'Sim';
			$confirmModalDefaults.defaultLabels.cancel = 'Não';
		})
		.config(['growlProvider', function (growlProvider) {
			growlProvider
				.globalTimeToLive(3000)
				.globalReversedOrder(true)
				.globalDisableCountDown(true);
		}]);;

})();