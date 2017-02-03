<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ComponentTypes;
use Validator;

class ComponentTypesController extends Controller
{
    public function index()
    {
    	return ComponentTypes::all();
    }

    public function show($componentTypeId)
    {
    	return ComponentTypes::find($componentTypeId);
    }

    public function store(Request $request)
    {
    	$validationRequest = $this->validateRequest($request);

    	if ($validationRequest->fails()) {
    		return $validationRequest->errors();
    	}

    	return ComponentTypes::create($request->all());
    }

    public function update(Request $request, $componentTypeId)
    {
    	$requestValidation = $this->validateRequest($request);

    	if ($requestValidation->fails()) {
    		return $requestValidation->errors();
    	}

    	$componentType = ComponentTypes::find($componentTypeId);

    	if ($componentType) {
    		$componentType->update($request->all());
    		return $componentType;
    	}

    	return $this->generateErrorResponse();
    }

    public function destroy($componentTypeId)
    {
    	return ComponentTypes::destroy($componentTypeId);
    }

    private function validateRequest($request)
    {
    	$validator = Validator::make($request->all(), [
    		'name' => 'required'
    	]);

    	return $validator;
    }
}
