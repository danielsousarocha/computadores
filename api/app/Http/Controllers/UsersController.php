<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Computers;
use Validator;

class UsersController extends Controller
{
    public function index()
    {
    	return User::all();
    }

    public function show($userId)
    {
    	return User::find($userId)->load('computers.components.type');
    }

    public function store(Request $request)
    {
    	$validationRequest = $this->validateRequest($request);

    	if ($validationRequest->fails()) {
    		return $validationRequest->errors();
    	}

    	$requestData = $request->all();
    	$requestData['password'] = bcrypt($requestData['password']);

    	return User::create($requestData);
    }

    public function update(Request $request, $userId)
    {
    	$validationRequest = $this->validateRequest($request);

    	if ($validationRequest->fails()) {
    		return $validationRequest->errors();
    	}

    	$user = User::find($userId);

        if ($user) {
        	$user->update($request->all());
        	return $user;
        }

    	return $this->generateErrorResponse();
    }

    public function destroy($userId)
    {
    	return User::destroy($userId);
    }

    private function validateRequest($request)
    {
    	$validator = Validator::make($request->all(), [
    		'name' => 'required',
    		'email' => 'required|email|unique:users',
    		'password' => 'required|min:3'
    	]);

    	return $validator;
    }
}
