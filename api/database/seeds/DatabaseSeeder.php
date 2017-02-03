<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(ComputersTableSeeder::class);
        $this->call(ComponentTypesSeeder::class);
        $this->call(ComponentsSeeder::class);

        $this->call(ComputerUserTableSeeder::class);
        $this->call(ComponentComputerSeeder::class);
    }
}
