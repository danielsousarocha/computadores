<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Computers;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ComputerUserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$computerUserTable = DB::table('computer_user');

    	$computerUserTable->truncate();

    	$faker = Faker::create();

    	$usersId = User::all()->pluck('id')->toArray();
    	$computersId = Computers::all()->pluck('id')->toArray();
    	$currentDateTime = date("Y-m-d H:i:s");

    	for($i = 0; $i < 20; $i++) {
    		$computerUserTable->insert([
				'user_id' => $faker->randomElement($usersId),
				'computer_id' => $faker->randomElement($computersId),
				'created_at' => $currentDateTime,
				'updated_at' => $currentDateTime
			]);
    	}
    }
}
