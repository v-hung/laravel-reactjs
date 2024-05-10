<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\QuestionController;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\Api\PostController;
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


Route::prefix('v1')->group(function(){
    Route::prefix('posts')->group(function(){
        Route::get('/', [PostController::class, 'index']);
        Route::get('/{id}', [PostController::class, 'getPostDetails']);
    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->prefix('auth')->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
    Route::post('/logout', 'logout');
    Route::post('/logged', 'logged');
});

Route::middleware('auth:api')->group(function () {
    Route::prefix('v1')->group(function(){
        Route::prefix('posts')->group(function(){
            Route::get('/', [PostController::class, 'index']);
            Route::get('/{id}', [PostController::class, 'getPostDetails']);
        });
    });
    Route::get('/tests', [TestController::class, 'listTest']);
    Route::get('/tests/{code}', [TestController::class, 'testDetails']);
    Route::get('/tests/{code}/questions', [TestController::class, 'testDetailsWidthQuestion']);

    Route::get('/test-history/{id}/questions', [TestController::class, 'questionsOfTestHistory']);

    Route::post('/submit-test', [TestController::class, 'submitTest']);
});

