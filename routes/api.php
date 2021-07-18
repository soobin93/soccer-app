<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;

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

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'index']);
    Route::get('/user/current', [UserController::class, 'getCurrentUser']);
    Route::get('/user/{user}', [UserController::class, 'view']);

    Route::post('/user', [UserController::class, 'create']);
    Route::post('/user/{user}', [UserController::class, 'update']);
});

Route::post('login', [UserController::class, 'login']);
Route::post('logout', [UserController::class, 'logout']);
