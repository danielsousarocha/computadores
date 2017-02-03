<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Computers;
use App\User;
use Validator;

class ComputersController extends Controller
{
    public function index()
    {
    	return Computers::all();
    }

    public function show($computerId)
    {
    	return Computers::find($computerId)->load('users', 'components.type');
    }

    public function store(Request $request)
    {
    	$requestValidation = $this->validateRequest($request);

    	if ($requestValidation->fails()) {
    		return $requestValidation->errors();
    	}

    	return Computers::create($request->all());
    }

    public function update(Request $request, $computerId)
    {
    	$requestValidation = $this->validateRequest($request);

    	if ($requestValidation->fails()) {
    		return $requestValidation->errors();
    	}

    	$computer = Computers::find($computerId);

    	if ($computer) {
    		$computer->update($request->all());
    		return $computer;
    	}

    	return $this->generateErrorResponse();
    }

    public function destroy($computerId)
    {
    	return Computers::destroy($computerId);
    }

    private function validateRequest($request)
    {
    	$validator = Validator::make($request->all(), [
    		'name' => 'required|min:5'
    	]);

    	return $validator;
    }
}
