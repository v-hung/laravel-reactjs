<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use TCG\Voyager\Facades\Voyager;
use Laravel\Passport\Passport;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});

Route::get('/{path?}', [
    'uses' => function () {
        return view('app');
    },
    'as' => 'react',
    'where' => ['path' => '.*']
]);

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/clients', function (Request $request) {
        $userId = $request->user()->getAuthIdentifier();

        $clients = Passport::client()->where('user_id', $userId)
        ->orderBy('name', 'asc')->get();

        // dd($clients);
        return view('clients', [
            'clients' => $clients
        ]);
    })->name('clients');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/posts/{id}', [PostController::class, 'getSinglePost'])->name('posts.single');


require __DIR__.'/auth.php';