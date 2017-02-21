<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Computers extends Model
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
    	return $this->belongsToMany('App\Components', 'component_computer', 'computer_id', 'component_id');
    }

    public function users()
    {
    	return $this->belongsToMany('App\User', 'computer_user', 'computer_id', 'user_id');
    }
}
