<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Components;
use Validator;

class ComponentsController extends Controller
{
    public function index()
    {
    	return Components::all();
    }

    public function show($componentId)
    {
    	return Components::find($componentId)->load('computers', 'type');
    }

    public function store(Request $request)
    {
    	$validationRequest = $this->validateRequest($request);

    	if ($validationRequest->fails()) {
    		return $validationRequest->errors();
    	}

    	return Components::create($request->all());
    }

    public function update(Request $request, $componentId)
    {
    	$requestValidation = $this->validateRequest($request);

    	if ($requestValidation->fails()) {
    		return $requestValidation->errors();
    	}

    	$component = Components::find($componentId);

    	if ($component) {
    		$component->update($request->all());
    		return $component;
    	}

    	return $this->generateErrorResponse();
    }

    public function destroy($componentId)
    {
    	return Components::destroy($componentId);
    }

    private function validateRequest($request)
    {
    	$validator = Validator::make($request->all(), [
    		'component_type_id' => 'required|integer',
    		'model' => 'required'
    	]);

    	return $validator;
    }
}
