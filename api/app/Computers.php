<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Computers extends Model
{
    protected $fillable = [
    	'name'
    ];

    public function components()
    {
    	return $this->belongsToMany('App\Components', 'component_computer', 'computer_id', 'component_id');
    }

    public function users()
    {
    	return $this->belongsToMany('App\User', 'computer_user', 'computer_id', 'user_id');
    }
}
