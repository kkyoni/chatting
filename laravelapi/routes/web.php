<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('login', [Admin\Auth\LoginController::class, 'showLoginForm'])->name('showLoginForm');
Route::get('login', [Admin\Auth\LoginController::class, 'showLoginForm'])->name('login');
Route::post('login', [Admin\Auth\LoginController::class, 'login']);
Route::get('resetPassword', [Admin\Auth\PasswordResetController::class, 'showPasswordRest'])->name('resetPassword');
Route::post('sendResetLinkEmail', [Admin\Auth\ForgotPasswordController::class, 'sendResetLinkEmail'])->name('sendResetLinkEmail');
Route::get('find/{token}', [Admin\Auth\PasswordResetController::class, 'find'])->name('find');
Route::post('create', [Admin\Auth\PasswordResetController::class, 'create'])->name('sendLinkToUser');
Route::post('reset', [Admin\Auth\PasswordResetController::class, 'reset'])->name('resetPassword_set');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/logout', [\App\Http\Controllers\Auth\LoginController::class, 'logout'])->name('logout');

//====================> Update Admin Profile =========================
Route::get('/profile', [\App\Http\Controllers\UsersController::class, 'updateProfile'])->name('profile');
Route::post('/updateProfileDetail', [\App\Http\Controllers\UsersController::class, 'updateProfileDetail'])->name('updateProfileDetail');
Route::post('/updatePassword', [\App\Http\Controllers\UsersController::class, 'updatePassword'])->name('updatePassword');

//====================> User Management =========================
Route::get('/user', [\App\Http\Controllers\UsersController::class, 'index'])->name('user.index');
Route::get('/user/activity_log/{id}', [\App\Http\Controllers\UsersController::class, 'activity_log'])->name('user.activity_log');
Route::post('/user/delete/{id}', [\App\Http\Controllers\UsersController::class, 'delete'])->name('user.delete');
Route::get('/user/show', [\App\Http\Controllers\UsersController::class, 'show'])->name('user.show');
Route::get('/user/showactivity', [\App\Http\Controllers\UsersController::class, 'showactivity'])->name('user.showactivity');
Route::post('/user/change_status', [\App\Http\Controllers\UsersController::class, 'change_status'])->name('user.change_status');
