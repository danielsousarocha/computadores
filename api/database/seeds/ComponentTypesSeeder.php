<?php

use Illuminate\Database\Seeder;
use App\ComponentTypes;

class ComponentTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ComponentTypes::truncate();

        $componentTypes = ['Placa-mãe', 'Placa de Vídeo', 'Memória', 'Processador'];

        foreach($componentTypes as $type) {
        	ComponentTypes::create(['name' => $type]);
        }
    }
}
