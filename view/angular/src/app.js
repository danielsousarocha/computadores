(function () {
	'use strict';

	angular
		.module("app", ["ngRoute", "ngAnimate", "ngTouch", "ui.bootstrap", "angular-loading-bar", "angularUtils.directives.dirPagination"])
		.config(function($routeProvider, $locationProvider) {

			$locationProvider.html5Mode(true);

			$routeProvider
				.when("/users", {
					templateUrl: "src/views/users/index.html",
					controller: 'usersController',
					controllerAs: "vm"
				})
				.when("/users/create", {
					templateUrl: "src/views/users/form.html",
					controller: "usersController",
					controllerAs: "vm"
				})
				.when("/user/:id", {
					templateUrl: "src/views/users/form.html",
					controller: "usersController",
					controllerAs: "vm"
				})
				.when("/show/user/:id", {
					templateUrl: "src/views/users/show.html",
					controller: "usersController",
					controllerAs: "vm"
				})
				.when("/computers", {
					templateUrl: "src/views/computers/index.html",
					controller: "computersController",
					controllerAs: "vm"
				})
				.when("/components", {
					templateUrl: "src/views/components.html",
					controllerAs: "vm"
				})
				.when("/types", {
					templateUrl: "src/views/types.html",
					controllerAs: "vm"
				})
				.otherwise({
					redirectTo: "/",
					templateUrl: "src/views/home.html"
				});
		});

})();