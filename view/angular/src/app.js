(function () {
	'use strict';

	angular
		.module("app", [
			"ngRoute",
			"ngAnimate",
			"ngTouch",
			"ui.bootstrap",
			"angular-loading-bar",
			"angularUtils.directives.dirPagination",
			"angular-growl",
			"angular-confirm"
		])
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
				.when("/computers/create", {
					templateUrl: "src/views/computers/form.html",
					controller: "computersController",
					controllerAs: "vm"
				})
				.when("/computer/:id", {
					templateUrl: "src/views/computers/form.html",
					controller: "computersController",
					controllerAs: "vm"
				})
				.when("/show/computer/:id", {
					templateUrl: "src/views/computers/show.html",
					controller: "computersController",
					controllerAs: "vm"
				})

				.when("/components", {
					templateUrl: "src/views/components/index.html",
					controller: "componentsController",
					controllerAs: "vm"
				})
				.when("/components/create", {
					templateUrl: "src/views/components/form.html",
					controller: "componentsController",
					controllerAs: "vm"
				})
				.when("/component/:id", {
					templateUrl: "src/views/components/form.html",
					controller: "componentsController",
					controllerAs: "vm"
				})
				.when("/show/component/:id", {
					templateUrl: "src/views/components/show.html",
					controller: "componentsController",
					controllerAs: "vm"
				})

				.when("/types", {
					templateUrl: "src/views/componentTypes/index.html",
					controller: "componentTypesController",
					controllerAs: "vm"
				})
				.when("/types/create", {
					templateUrl: "src/views/componentTypes/form.html",
					controller: "componentTypesController",
					controllerAs: "vm"
				})
				.when("/type/:id", {
					templateUrl: "src/views/componentTypes/form.html",
					controller: "componentTypesController",
					controllerAs: "vm"
				})
				.when("/show/type/:id", {
					templateUrl: "src/views/componentTypes/show.html",
					controller: "componentTypesController",
					controllerAs: "vm"
				})

				.otherwise({
					redirectTo: "/",
					templateUrl: "src/views/home.html"
				});
		});

})();