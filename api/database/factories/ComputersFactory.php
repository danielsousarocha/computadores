<?php

$factory->define(App\Computers::class, function(Faker\Generator $faker) {

	return [
		'name' => $faker->lastName
	];

});