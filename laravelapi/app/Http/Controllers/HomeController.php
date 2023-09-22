<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Chat;
use App\Models\LogActivity;
use App\Models\Setting;
use App\Models\User;
use Carbon\Carbon;
use Response;
use GuzzleHttp\Client;

class HomeController extends Controller
{
    protected $authLayout = '';
    protected $pageLayout = 'pages.';
    /**
     * * * Create a new controller instance.
     * * *
     * * * @return void
     * * */
    protected $client;

    public function __construct()
    {
        $this->authLayout = 'auth.';
        $this->pageLayout = 'pages.';
        $this->middleware('auth');
        $this->client = new Client();
    }
    public function index()
    {
        $weatherapiKey = config('services.weather.weather_api_key');
        $weatherapiCity = config('services.weather.weather_api_city');
        $url = "https://api.weatherapi.com/v1/current.json?key=$weatherapiKey&q=$weatherapiCity";
        $response = $this->client->get($url);
        $weatheBody = json_decode($response->getBody(), true);
        $weatheResponse = $weatheBody['current']['temp_c'];
        $userCount = User::where('user_type', '!=', 'superadmin')->count();
        $chatCount = Chat::count();
        $logactivityCount = LogActivity::count();
        $userList = $chatList = $monthList = [];
        $userData = User::where('user_type', '!=', 'superadmin')->selectRaw('MONTH(created_at) as month, YEAR(created_at) as year, COUNT(*) as count')->groupBy('year', 'month')->orderBy('year', 'asc')->orderBy('month', 'asc')->get();
        $chatData = Chat::selectRaw('MONTH(created_at) as month, YEAR(created_at) as year, COUNT(*) as count')->groupBy('year', 'month')->orderBy('year', 'asc')->orderBy('month', 'asc')->get();
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        foreach ($months as $month) {
            $userList[] = $userData->where('month', array_search($month, $months) + 1)->sum('count');
            $chatList[] = $chatData->where('month', array_search($month, $months) + 1)->sum('count');
            $monthList[] = $month;
        }
        $currentDateTime = Carbon::now();
        $formattedDateTime = $currentDateTime->format('d.m.Y');
        return view('pages.home', compact('userList', 'chatList', 'monthList', 'userCount', 'chatCount', 'logactivityCount', 'weatheResponse','formattedDateTime'));
    }
}
