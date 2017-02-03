<?php

use Illuminate\Database\Seeder;
use App\Components;
use App\Computers;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ComponentComputerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$componentComputerTable = DB::table('component_computer');

    	$componentComputerTable->truncate();

    	$faker = Faker::create();

    	$componentsId = Components::all()->pluck('id')->toArray();
    	$computersId = Computers::all()->pluck('id')->toArray();
    	$currentDateTime = date("Y-m-d H:i:s");

    	for($i = 0; $i < 20; $i++) {
    		$componentComputerTable->insert([
				'component_id' => $faker->randomElement($componentsId),
				'computer_id' => $faker->randomElement($computersId),
				'created_at' => $currentDateTime,
				'updated_at' => $currentDateTime
			]);
    	}
    }
}
