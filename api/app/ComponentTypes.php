<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class ComponentTypes extends Model
{
    protected $fillable = [
    	'name'
    ];

    public function getCreatedAtAttribute($date)
    {
        return Carbon::parse($date)->format('d/m/Y');
    }

    public function components()
    {
    	return $this->hasMany('App\Components', 'component_type_id');
    }
}
