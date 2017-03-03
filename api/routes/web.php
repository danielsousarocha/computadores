<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

// Component Types
Route::get('/types', 'ComponentTypesController@index');
Route::post('/types', 'ComponentTypesController@store');
Route::get('/type/{type}', 'ComponentTypesController@show');
Route::put('/type/{type}', 'ComponentTypesController@update');
Route::delete('/type/{type}', 'ComponentTypesController@destroy');

// Components
Route::get('/components', 'ComponentsController@index');
Route::post('/components', 'ComponentsController@store');
Route::get('/component/{component}', 'ComponentsController@show');
Route::put('/component/{component}', 'ComponentsController@update');
Route::delete('/component/{component}', 'ComponentsController@destroy');

// Computers
Route::get('/computers', 'ComputersController@index');
Route::post('/computers', 'ComputersController@store');
Route::get('/computer/{computer}', 'ComputersController@show');
Route::put('/computer/{computer}', 'ComputersController@update');
Route::delete('/computer/{computer}', 'ComputersController@destroy');

// Users
Route::get('/users', 'UsersController@index');
Route::post('/users', 'UsersController@store');
Route::get('/user/{user}', 'UsersController@show');
Route::put('/user/{user}', 'UsersController@update');
Route::delete('/user/{user}', 'UsersController@destroy');