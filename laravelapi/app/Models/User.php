<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'avatar',
        'name',
        'last_name',
        'mobile_number',
        'birth_date',
        'website',
        'address',
        'email',
        'password',
        'user_type',
        'status',
        'available',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function sentMessagesCount()
    {
        return $this->hasMany(Chat::class, 'sent_from')
            ->selectRaw('sent_from, SUM(CASE WHEN is_read = 1 THEN 1 ELSE 0 END) as count, MAX(message) as last_message')
            ->where('block_flage', 0)
            ->whereNull('deleted_at')
            ->orderBy('created_at', 'desc') // Order messages within each group
            ->groupBy('sent_from');
        // return $this->hasMany(Chat::class, 'sent_to')
        //     ->selectRaw('sent_to, SUM(CASE WHEN is_read = 1 THEN 1 ELSE 0 END) as count')
        //     ->groupBy('sent_to');
    }
}
