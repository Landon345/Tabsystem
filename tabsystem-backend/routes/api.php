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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::middleware('auth:api')->group(function () {
    Route::middleware('admin:api')->group(function () {
        //get users
        Route::get('users', 'UserController@index');
        Route::get('userOfTab/{id}', 'UserController@userOfTab');

        //get tabs
        Route::get('/tab', 'TabController@index');
        Route::get('/tab/{id}', 'TabController@show');
        Route::get('/tab/balance/total', 'TabController@totalBalances');
        Route::post('/tab', 'TabController@storeTab');
        Route::put('/tab', 'TabController@storeTab');
        Route::delete('/tab/{id}', 'TabController@destroy');

        Route::get('/item', 'ItemController@index');
        Route::get('/item/{id}', 'ItemController@show');
        Route::get('item/price/total', 'ItemController@totalPrices');
        Route::post('/item', 'ItemController@storeItem');
        Route::put('/item', 'ItemController@storeItem');
        // delete without refund
        Route::delete('/item/{id}', 'ItemController@destroy');
        //delete with refund
        Route::delete('/itemrefund/{id}', 'ItemController@destroyRefund');

        Route::get('/commonitem', 'CommonItemController@index');
        Route::get('/commonitem/{id}', 'CommonItemController@show');
        Route::post('/commonitem', 'CommonItemController@storeCommonItem');
        Route::put('/commonitem', 'CommonItemController@storeCommonItem');
        Route::delete('/commonitem/{id}', 'CommonItemController@destroy');

        Route::get('/category', 'CategoryController@index');
        Route::get('/category/{id}', 'CategoryController@show');
        Route::post('/category', 'CategoryController@storeCategory');
        Route::put('/category', 'CategoryController@storeCategory');
        Route::delete('/category/{id}', 'CategoryController@destroy');
    });

    Route::get('/user/tabs', 'TabController@userTabs');
    Route::get('/user/tabs/{id}', 'TabController@showUserTab');
    Route::get('/user/tabs/{id}/items', 'TabController@showUserTabItems');


    Route::post('/logout', 'UserController@logout');
});

//Route::get('/item', 'ItemController@index');
Route::post('/registeradmin', 'UserController@registeradmin');
Route::post('/register', 'UserController@register');
Route::post('/login', 'UserController@login');


Route::fallback(function () {
    return response()->json([
        'message' => 'Page Not Found.'
    ], 404);
});
