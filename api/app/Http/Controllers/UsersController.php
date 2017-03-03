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
            return $this->generateErrorResponse($validationRequest->errors());
    	}

        $requestData = $request->all();
    	$requestData['computersIds'] = array_column($requestData['computers'], 'id');

    	if (isset($requestData['password'])) {
            $requestData['password'] = bcrypt($requestData['password']);
        }

    	$createdUser = User::create($requestData);

        if (!empty($requestData['computersIds'])) {
            $createdUser->computers()->attach($requestData['computersIds']);
        }

        return $createdUser;
    }

    public function update(Request $request, $userId)
    {
    	$validationRequest = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email'
        ]);

    	if ($validationRequest->fails()) {
    		return $this->generateErrorResponse($validationRequest->errors());
    	}

    	$user = User::whereEmail($request->email)->first();
        if ($user) {
            $requestData = $request->all();
            $requestData['computersIds'] = array_column($requestData['computers'], 'id');

            $user->update($requestData);

            if (!empty($requestData['computersIds'])) {
            	$user->computers()->sync($requestData['computersIds']);;
            }

        	return $user;
        }

        $error = ['user' => [ 0 => 'User not found']];
    	return $this->generateErrorResponse($error);
    }

    public function destroy($userId)
    {
    	return User::destroy($userId);
    }

    public function removeComputer($userId, $computerId)
    {
        return User::find($userId)->computers()->detach($computerId);
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
