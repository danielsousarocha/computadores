<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Components extends Model
{
    protected $fillable = [
    	'component_type_id',
    	'name',
    	'model'
    ];

    public function getCreatedAtAttribute($date)
    {
        return Carbon::parse($date)->format('d/m/Y');
    }

    public function type()
    {
    	return $this->belongsTo('App\ComponentTypes', 'component_type_id');
    }

    public function computers()
    {
    	return $this->belongsToMany('App\Computers', 'component_computer', 'component_id', 'computer_id');
    }
}
