<?php

use Illuminate\Database\Seeder;
use App\Computers;

class ComputersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Computers::truncate();

        factory(Computers::class, 10)->create();
    }
}
