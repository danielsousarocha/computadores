<!DOCTYPE html>
<html lang="en" ng-app="training">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<title>Laravel</title>

		<link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

		<style type="text/css">
			* {
				margin: 0;
				padding: 0;
			}

			ul {
				list-style: none;
				padding-left: 10px;
			}

			small {
				font-size: 0.7em;
				color: #999;
			}
		</style>
	</head>
	<body ng-controller="ComputersController">
		<h1>Angular Training: <small ng-if="remaining()">(@{{ remaining() }} left)</small></h1>

		<input type="text" placeholder="Filter computers" ng-model="search">

		<ul>
			<li ng-repeat="computer in computers | filter:search">
				@{{computer.id}}
				@{{computer.name}}
			</li>
		</ul>

		<form ng-submit="addTodo()">
			<input type="text" placeholder="Add new task" ng-model="newTotoText">
			<button type="submit">Add new task</button>
		</form>

		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular.min.js"></script>
		<script type="text/javascript">
			var app = angular.module('training', []);

			app.controller('ComputersController', function($scope, $http) {

				$http.get('/computers')
					.then(function(computers) {
						$scope.computers = computers.data;
					});

				$scope.remaining = function() {
					var count = 0;

					angular.forEach($scope.computers, function(computer) {
						count += computer.completed ? 0 : 1;
					});

					return count;
				}

				$scope.addTodo = function() {
					var computer = {
						id: parseInt(Math.random(10) * 10 + 1),
						name: $scope.newTotoText
					};

					$scope.computers.push(computer);
					$http.post('/computers', computer);
				}
			});
		</script>
	</body>
</html>
