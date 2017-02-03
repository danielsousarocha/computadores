<?php

use Illuminate\Database\Seeder;
use App\Components;

class ComponentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Components::truncate();

        $components = [
        	['component_type_id' => 1, 'model' => 'GA-F2A88XN'],
        	['component_type_id' => 1, 'model' => 'A88X-PRO'],
        	['component_type_id' => 2, 'model' => 'GTX 1070'],
        	['component_type_id' => 2, 'model' => 'RX 460'],
        	['component_type_id' => 3, 'model' => 'DDR3 4GB'],
        	['component_type_id' => 3, 'model' => 'DDR4 8GB'],
        	['component_type_id' => 4, 'model' => 'Core i7 7700'],
        	['component_type_id' => 4, 'model' => 'FX 6300']
        ];

        foreach($components as $component) {
        	Components::create($component);
        }
    }
}
