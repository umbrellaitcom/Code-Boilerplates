<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

Route::group([
    'middleware' => 'auth:api',
    'prefix' => 'menu'
], function ($router) {
    Route::get('', 'MenuController@getByDate');
    Route::post('', 'MenuController@create');
    Route::put('', 'MenuController@update');
});

Route::group([
    'middleware' => 'auth:api',
    'prefix' => 'menu/item'
], function ($router) {
    Route::get('', 'MenuItemController@getList');
    Route::get('{menuItem}', 'MenuItemController@getOneById');
    Route::post('', 'MenuItemController@create');
    Route::put('{menuItem}', 'MenuItemController@update');
    Route::delete('{menuItem}', 'MenuItemController@deleteOneById');
});

