<?php

use App\Http\Controllers\API\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/user-login', [UsersController::class, 'userLogin']);
Route::post('/edit-chat', [UsersController::class, 'EditChat']);
Route::post('/user-signup', [UsersController::class, 'userSignUp']);
Route::post('/forgotPassword', [UsersController::class, 'forgotPassword']);
Route::get('/get-user/{user_id}', [UsersController::class, 'getUser']);
Route::get('/get-notes/{user_id}', [UsersController::class, 'getNotes']);
Route::get('/get-download/{id}', [UsersController::class, 'getdownload']);
Route::get('/get-notesfilter/{user_id}/{filter}', [UsersController::class, 'getNotesFilter']);
Route::get('/get-chatstatus/{sent_from}/{sent_to}', [UsersController::class, 'getChatStatus']);
Route::get('/get-deletenotes/{id}', [UsersController::class, 'getdeletenotes']);
Route::post('/add-notes', [UsersController::class, 'addnotes']);
Route::get('/get-chat/{user_id}/{rece_id}', [UsersController::class, 'getChat']);
Route::get('/get-bolckUserDelete/{user_id}/{rece_id}', [UsersController::class, 'bolckUserDelete']);
Route::get('/get-deleteUserChat/{user_id}/{rece_id}', [UsersController::class, 'deleteUserChat']);
Route::post('/profile', [UsersController::class, 'profile']);
Route::post('/message-save', [UsersController::class, 'messagesave']);
Route::get('/get-viewinfo/{user_id}/{rece_id}', [UsersController::class, 'getviewinfo']);
Route::get('/get-receviceviewinfo/{rece_id}', [UsersController::class, 'getreceviceviewinfo']);
Route::get('/get-deleteChat/{id}', [UsersController::class, 'getChatDelete']);
Route::get('/get-popupmodelfile/{id}', [UsersController::class, 'getPopupModelFile']);
// Route::get('/user/{email}', [UsersController::class, 'userDetail']);
// Route::post('/images', [UsersController::class, 'images']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
