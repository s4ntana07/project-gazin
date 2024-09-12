<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function() {
    Route::get('logout',[AuthController::class,'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users',UserController::class);
});



Route::post('login',[AuthController::class,'login']);
Route::post('register',[AuthController::class,'register']);
Route::post('addproduct', [ProductController::class, 'store']);
Route::get('products', [ProductController::class, 'index']);      // Listar todos os produtos
Route::get('products/{id}', [ProductController::class, 'show']);  // Exibir um produto específico
Route::put('products/{id}', [ProductController::class, 'update']); // Atualizar um produto existente
Route::delete('products/{id}', [ProductController::class, 'destroy']); // Deletar um produto


