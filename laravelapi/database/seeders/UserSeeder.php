<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'avatar' => 'default.png',
            'name' => 'Admin',
            'last_name' => 'Admin',
            'mobile_number' => '0000000000',
            'birth_date' => '00/00/0000',
            'website' => 'http://localhost:3000/Profile',
            'address' => 'Address',
            'email' => 'admin@admin.com',
            'password' => bcrypt('data@1234'),
            'user_type' => 'superadmin',
            'status' => 'active',
            'available' => 'on',
        ]);
        User::create([
            'avatar' => 'jaymin.png',
            'name' => 'jaymin',
            'last_name' => 'modi',
            'mobile_number' => '9876543210',
            'birth_date' => '30/05/1994',
            'website' => 'http://localhost:3000/Profile',
            'address' => '4/2/25 salviwado patan',
            'email' => 'jaymin@gmail.com',
            'password' => bcrypt('data@1234'),
            'user_type' => 'users',
            'status' => 'active',
            'available' => 'on',
        ]);
        User::create([
            'avatar' => 'bharat.png',
            'name' => 'bharat',
            'last_name' => 'Patel',
            'mobile_number' => '9876543210',
            'birth_date' => '03/05/1996',
            'website' => 'http://localhost:3000/Profile',
            'address' => 'Shilp Corporate Park, B - 1009 to 1014, behind Rajpath Rangoli Road, Bodakdev, Ahmedabad, Gujarat 380054',
            'email' => 'bharat@gmail.com',
            'password' => bcrypt('data@1234'),
            'user_type' => 'users',
            'status' => 'active',
            'available' => 'on',
        ]);
    }
}
