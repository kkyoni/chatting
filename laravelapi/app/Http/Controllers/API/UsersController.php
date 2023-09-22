<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Block;
use App\Models\User;
use App\Models\Setting;
use DataTables, Str, ZipArchive;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Contracts\Session\Session;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Models\Chat;
use App\Models\Notes;
use App\Models\DocumentFile;
use Illuminate\Support\Facades\Log;
use League\CommonMark\Node\Block\Document;
use App\Helpers\Helper;

class UsersController extends Controller
{
    private $status_code  = 200;

    // ------------------ User Login ---------------------
    public function userLogin(Request $request)
    {
        if (Auth::attempt(['email'     => $request->get('email'), 'password'  => $request->get('password'), 'status'    => 'active'])) {
            $loginAttempt = Auth::attempt(['email' => $request->get('email'), 'password' => $request->get('password')]);
            if (Auth::user()->user_type == 'users') {
                $user = $this->userDetail($request->email);
                if (!empty($user)) {
                    return response()->json(["status" => $this->status_code, "success" => true, "message" => "Singup Sucessfully ⚡️", "data" => $user]);
                }
            } else {
                return response()->json(["status" => "failed", "success" => false, "message" => "Unable to login. Incorrect password."]);
            }
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Unable to login. Email doesn't exist."]);
        }
    }

    // ------------------ User Detail ---------------------
    public function userDetail($email)
    {
        $user = array();
        if ($email != "") {
            $user = User::where("email", $email)->first();
            User::where('id', $user->id)->update(['available' => 'on']);
            return $user;
        }
    }

    // ------------------ Edit Chat ---------------------
    public function EditChat(Request $request)
    {
        try {
            $EditChat = Chat::where('id', $request->id)->first();
            Helper::addToLog('Edit Message SucessFully', 'success', $EditChat->sent_from, 'chat', $EditChat->id, $EditChat);
            Chat::where('id', $request->id)->update(['message' => $request->message]);
            return response()->json(['status' => 'success', 'message' => 'Edit Message SucessFully']);
        } catch (\Exception $exception) {
            return response()->json(['status' => 'error', 'message' => $exception->getMessage()]);
        }
    }

    // ------------------ User SignUp ---------------------
    public function userSignUp(Request $request)
    {
        $validator  =  Validator::make($request->all(), ["name" => "required", "email" => "required|email", "password" => "required"]);
        if ($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "validation_error", "errors" => $validator->errors()]);
        }
        try {
            $data = ['name' => $request->name, 'email' => $request->email, 'password' => bcrypt($request->password)];
            $singup = User::create($data);
            return response()->json(['singup'  => $singup, 'status' => 'success', 'message' => 'Singup Sucessfully ⚡️']);
        } catch (\Exception $e) {
            return ['value'  => [], 'status' => 'error', 'message'   => $e->getMessage()];
        }
    }

    // ------------------ User Forgot Password ---------------------
    public function forgotPassword(Request $request)
    {
        try {
            $user = User::where(['email' => $request->email])->first();
            if (!$user) {
                return response()->json(['status'    => 'error', 'message'   => "Invalid e-mail address."]);
            } else {
                $thankyou1 = Setting::where('code', 'thankyou')->first();
                $thankyou = $thankyou1->value;
                $password = Str::random(8);
                $body = "We cannot simply send you your old password. New Password";
                $details = ['title' => 'Forget Password', 'body' => $body, 'name' => $user->name, 'password' => $password, 'thankyou' => $thankyou];
                Mail::to($user->email)->send(new \App\Mail\ForgetPasswordMail($details));
                $user->password = \Hash::make($password);
                $user->save();
                return response()->json(['status'    => 'success', 'message'   => 'New password is sent to your mail.']);
            }
        } catch (\Exception $e) {
            return response()->json(['status'    => 'error', 'message'   => $e->getMessage()]);
        }
    }

    // ------------------ Get User ---------------------
    public function getUser(Request $request, $user_id)
    {
        try {
            $user = User::with(['sentMessagesCount'])->where('status', 'active')->where('id', '!=', $user_id)->orderBy('id', 'desc')->get();
            if ($user) {
                return response()->json(['user'  => $user, 'status' => 'success', 'message' => 'User Listed Successfully !!']);
            } else {
                return response()->json(['status' => 'error', 'message' => 'User Record Not Successfully !!']);
            }
        } catch (\Exception $e) {
            return ['value'  => [], 'status' => 'error', 'message'   => $e->getMessage()];
        }
    }

    // ------------------ Get Notes ---------------------
    public function getNotes(Request $request, $id)
    {
        try {
            $notes = Notes::where('user_id', $id)->get();
            if (sizeof($notes) > 0) {
                return response()->json(['status' => 'success', 'message' => 'Notes Record List', 'notes' => $notes]);
            } else {
                return response()->json(['status' => 'error', 'message' => 'Notes Record Not Found...']);
            }
        } catch (\Exception $exception) {
            return response()->json(['status' => 'error', 'message' => $exception->getMessage()]);
        }
    }

    // ------------------ Get Download ---------------------
    public function getdownload(Request $request, $id)
    {
        try {
            $filePath = public_path("dummy.pdf");
            $headers = ['Content-Type: application/pdf'];
            $fileName = time() . '.pdf';
            return response()->download($filePath, $fileName, $headers);
        } catch (\Exception $exception) {
            return response()->json(['status' => 'error', 'message' => $exception->getMessage()]);
        }
    }

    // ------------------ Get Notes Filter ---------------------
    public function getNotesFilter(Request $request, $id, $filter)
    {
        try {
            $notes = Notes::where('user_id', $id)->where('status', $filter)->get();
            if (!empty($notes)) {
                return response()->json(['status' => 'success', 'message' => 'Notes Record List', 'notes' => $notes]);
            } else {
                // $notes = Notes::where('user_id', $id)->get();
                return response()->json(['status' => 'error', 'message' => 'Notes Record List']);
            }
        } catch (\Exception $exception) {
            return response()->json(['status' => 'error', 'message' => $exception->getMessage()]);
        }
    }

    // ------------------ Get Chat Status ---------------------
    public function getChatStatus(Request $request, $sent_from, $sent_to)
    {
        try {
            Chat::where('sent_from', $sent_from)->where('sent_to', $sent_to)->where('is_read', '1')->update(['is_read' => '0']);
            return response()->json(['status' => 'success', 'message' => 'Chat Status Updated']);
        } catch (\Exception $exception) {
            return response()->json(['status' => 'error', 'message' => $exception->getMessage()]);
        }
    }

    // ------------------ Get Delete Notes ---------------------
    public function getdeletenotes(Request $request, $id)
    {
        try {
            $notes = Notes::where('id', $id)->first();
            Helper::addToLog('Notes Delete Sucessfully', 'success', $notes->user_id, 'notes', $notes->id, $notes);
            $notes->delete();
            return response()->json(['status' => 'success', 'message' => 'Notes Delete Sucessfully']);
        } catch (\Exception $exception) {
            return response()->json(['message' => $exception->getMessage()]);
        }
    }

    // ------------------ Add Notes ---------------------
    public function addnotes(Request $request)
    {
        try {
            $title_error = '';
            $description_error = '';
            $status_error = '';
            if (!$request->title) {
                $title_error = 'Title is Required !!';
            }
            if (!$request->description) {
                $description_error = 'Description is Required !!';
            }
            if (!$request->status) {
                $status_error = 'Status is Required !!';
            }
            if ($title_error || $description_error || $status_error) {
                return response()->json(['status' => 'error', 'title_error' => $title_error, 'description_error' => $description_error, 'status_error' => $status_error]);
            }
            $data = ['user_id' => $request->user_id, 'title' => $request->title, 'description' => $request->description, 'status' => $request->status];
            $notes = Notes::create($data);
            if ($notes) {
                Helper::addToLog('Notes Record SucessFully', 'success', $notes->user_id, 'notes', $notes->id, $notes);
                return response()->json(['status' => 'success', 'message' => 'Notes Record SucessFully']);
            } else {
                Helper::addToLog('Notes Record Not Sucessfully', 'error', $notes->user_id, 'notes', 0, $notes);
                return response()->json(['status' => 'error', 'message' => 'Notes Record Not Sucessfully']);
            }
        } catch (\Exception $exception) {
            return response()->json(['message' => $exception->getMessage()]);
        }
    }

    // ------------------ Get Chat ---------------------
    public function getChat(Request $request, $user_id, $rece_id)
    {
        try {
            $getUserSentMessages = Chat::with(['Document'])->where('sent_from', $user_id)->where('sent_to', $rece_id)->where('block_flage', 0)->where('sent_from_delete', 0)->get()->toArray();
            $getUserReceivedMessages = Chat::with(['Document'])->where('sent_from', $rece_id)->where('sent_to', $user_id)->where('block_flage', 0)->where('sent_to_delete', 0)->get()->toArray();
            $data = array_merge($getUserSentMessages, $getUserReceivedMessages);
            array_multisort(array_column($data, "id"), SORT_ASC, $data);
            $userBlockedRece = Block::where('sent_from', $user_id)->where('sent_to', $rece_id)->first();
            $receBlockedUser = Block::where('sent_from', $rece_id)->where('sent_to', $user_id)->first();
            $datablock = ['user_blocked_rece' => $userBlockedRece ? true : false, 'rece_blocked_user' => $receBlockedUser ? true : false];
            if ($datablock['user_blocked_rece'] === true || $datablock['rece_blocked_user'] === true) {
                $BlockData = ['blockUser' => true, 'send_block' => $datablock['user_blocked_rece'], 'rece_block' => $datablock['rece_blocked_user']];
            } else {
                $BlockData = ['blockUser' => false, 'send_block' => $datablock['user_blocked_rece'], 'rece_block' => $datablock['rece_blocked_user']];
            }
            return response()->json(['status' => 'success', 'message' => 'Conversations Record List', 'chat' => $data, 'block_data' => $BlockData]);
        } catch (\Exception $exception) {
            return response()->json(['status' => 'error', 'message' => $exception->getMessage()]);
        }
    }

    // ------------------ Bolck User Delete ---------------------
    public function bolckUserDelete(Request $request, $user_id, $rece_id)
    {
        try {
            $block = Block::where('sent_from', $user_id)->where('sent_to', $rece_id)->first();
            if (!empty($block)) {
                Helper::addToLog('Your item has been UnBlock', 'success', $block->sent_from, 'block', $block->id, $block);
                $block_messge = "Your item has been UnBlock";
                $block->delete();
            } else {
                $data = ['sent_from' => $user_id, 'sent_to' => $rece_id];
                $block = Block::create($data);
                Helper::addToLog('Your item has been Block', 'success', $user_id, 'block', $block->id, $block);
                $block_messge = "Your item has been Block";
            }
            return response()->json(['status' => 'success', 'message' => 'Conversasions Record List', 'block_messge' => $block_messge]);
        } catch (\Exception $exception) {
            return response()->json(['status' => 'error', 'message' => $exception->getMessage()]);
        }
    }

    // ------------------ User Profile ---------------------
    public function profile(Request $request)
    {
        try {
            $namemessage = '';
            $lastnamemessage = '';
            $mobilenumbermessage = '';
            $birthdatemessage = '';
            $websitemessage = '';
            $addressmessage = '';
            $emailmessage = '';
            if (empty($request->name)) {
                $namemessage = "First Name Require !!";
            }
            if (empty($request->last_name)) {
                $lastnamemessage = "Last Name Require !!";
            }
            if (empty($request->mobile_number)) {
                $mobilenumbermessage = "Mobile Number Require !!";
            }
            if (empty($request->website)) {
                $websitemessage = "Web Site Require !!";
            }
            if (empty($request->birth_date)) {
                $birthdatemessage = "Birth Date Require !!";
            }
            if (empty($request->address)) {
                $addressmessage = "Address Require !!";
            }
            if (empty($request->email)) {
                $emailmessage = "Email Require !!";
            }
            if (!empty($namemessage) || !empty($lastnamemessage) || !empty($mobilenumbermessage) || !empty($birthdatemessage) || !empty($websitemessage) || !empty($addressmessage) || !empty($emailmessage)) {
                return response()->json(['status' => 'validtion', 'firstnamemessage' => $namemessage, 'lastnamemessage' => $lastnamemessage, 'mobilenumbermessage' => $mobilenumbermessage, 'websitemessage' => $websitemessage, 'birthdatemessage' => $birthdatemessage, 'addressmessage' => $addressmessage, 'emailmessage' => $emailmessage]);
            }
            User::where('id', $request->id)->update(['name' => $request->name, 'last_name' => $request->last_name, 'mobile_number' => $request->mobile_number, 'birth_date' => $request->birth_date, 'website' => $request->website, 'email' => $request->email, 'address' => $request->address]);
            $user = User::where('id', $request->id)->first();
            Helper::addToLog('User Profile Sucessfully', 'success', $user->id, 'users', $user->id, $user);
            return response()->json(['user'  => $user, 'status' => 'success', 'message' => 'User Profile Sucessfully']);
        } catch (\Exception $exception) {
            return response()->json(['status' => 'error', 'message' => $exception->getMessage()]);
        }
    }

    // ------------------ Message Create ---------------------
    public function messagesave(Request $request)
    {
        try {
            $sent_from = $request->sent_from;
            $sent_to = $request->sent_to;
            $chatCheck = Chat::create(['message' => $request->message, 'sent_from' => $sent_from, 'sent_to' => $sent_to, 'block_flage' => $request->block_flage, 'is_read' => 1]);
            if ($request->type === 'files') {
                if (!empty($chatCheck)) {
                    if ($request->hasFile('image')) {
                        $uploadedImages = $request->file('image');
                        $paths = [];
                        foreach ($uploadedImages as $uploadedImage) {
                            $path = $uploadedImage->store('public/document/image');
                            $paths[] = $path;
                            $stringToRemove = "public/document/image/";
                            $cleanedPath = str_replace($stringToRemove, '', $path);
                            DocumentFile::create(['chat_id' => $chatCheck->id, 'type' => $request->type, 'file' => $cleanedPath]);
                        }
                    }
                }
            }
            if ($request->type === 'document') {
                if (!empty($chatCheck)) {
                    if ($request->hasFile('image')) {
                        $uploadedImages = $request->file('image');
                        $paths = [];
                        foreach ($uploadedImages as $uploadedImage) {
                            $path = $uploadedImage->store('public/document/file');
                            $paths[] = $path;
                            $stringToRemove = "public/document/file/";
                            $cleanedPath = str_replace($stringToRemove, '', $path);
                            DocumentFile::create(['chat_id' => $chatCheck->id, 'type' => $request->type, 'file' => $cleanedPath]);
                        }
                    }
                }
            }
            $data = $this->getChat($request, $sent_from, $sent_to);
            Helper::addToLog('Message Create SucessFully', 'success', $sent_from, 'chat', $chatCheck->id, $chatCheck);
            return response()->json(['status' => 'success', 'message' => 'Message Create SucessFully', 'data' => $data]);
        } catch (\Exception $exception) {
            return response()->json(['status' => 'error', 'message' => $exception->getMessage()]);
        }
    }

    // ------------------ Get View Info ---------------------
    public function getviewinfo(Request $request, $user_id, $rece_id)
    {
        try {
            $getUserDetails = User::where('id', $rece_id)->first();
            if (!empty($getUserDetails)) {
                $getUserSentMessages = Chat::with(['Document'])->where('sent_from', $user_id)->Where('sent_to', $rece_id)->where('sent_from_delete', 0)->get()->toArray();
                $getUserRecivedMessages = Chat::with(['Document'])->where('sent_from', $rece_id)->Where('sent_to', $user_id)->where('sent_to_delete', 0)->get()->toArray();
                $getUserDetails['chatDetails'] = array_merge($getUserSentMessages, $getUserRecivedMessages);
                return response()->json(['status' => 'success', 'message'  => 'User ViewInfo Record List', 'userviewinfo' => $getUserDetails]);
            }
        } catch (\Exception $exception) {
            return response()->json(['status' => 'error', 'message' => $exception->getMessage()]);
        }
    }

    // ------------------ Get Recevice View Info ---------------------
    public function getreceviceviewinfo(Request $request, $rece_id)
    {
        try {
            $getUserDetails = User::where('id', $rece_id)->first();
            return response()->json(['status' => 'success', 'message'  => 'User ViewInfo Record List', 'receviuser' => $getUserDetails]);
        } catch (\Exception $exception) {
            return response()->json(['status' => 'error', 'message' => $exception->getMessage()]);
        }
    }

    // ------------------ Get Chat Delete ---------------------
    public function getChatDelete(Request $request, $id)
    {
        try {
            $chat = Chat::where('id', $id)->first();
            Helper::addToLog('Delete Message SucessFully', 'success', $chat->sent_from, 'chat', $chat->id, $chat);
            $chat->delete();
            return response()->json(['status' => 'success', 'message' => 'Delete Message SucessFully']);
        } catch (\Exception $exception) {
            return response()->json(['status' => 'error', 'message' => $exception->getMessage()]);
        }
    }

    // ------------------ Get PopUpModel Image ---------------------
    public function getPopupModelFile(Request $request, $id)
    {
        try {
            $document = DocumentFile::where('id', $id)->first();
            return response()->json(['status' => 'success', 'message' => 'Conversasions Record List', 'data' => $document]);
        } catch (\Exception $exception) {
            return response()->json(['status' => 'error', 'message' => $exception->getMessage()]);
        }
    }

    // ------------------ Delete User Chat ---------------------
    public function deleteUserChat(Request $request, $user_id, $rece_id)
    {
        try {
            $sendDelete = Chat::where('sent_from', $user_id)->where('sent_to', $rece_id)->get();

            if (!$sendDelete->isEmpty()) {
                foreach ($sendDelete as $send) {
                    Helper::addToLog('Delete All Message SucessFully', 'success', $send->sent_from, 'chat', $send->id, $send);
                    $send->delete();
                }
            }

            $receDelete = Chat::where('sent_from', $rece_id)->where('sent_to', $user_id)->get();

            if (!$receDelete->isEmpty()) {
                foreach ($receDelete as $rece) {
                    Helper::addToLog('Delete All Message SucessFully', 'success', $rece->sent_to, 'chat', $rece->id, $rece);
                    $rece->delete();
                }
            }
            return response()->json(['status' => 'success', 'message' => 'Delete All Message SucessFully']);
        } catch (\Exception $exception) {
            return response()->json(['status' => 'error', 'message' => $exception->getMessage()]);
        }
    }
}
