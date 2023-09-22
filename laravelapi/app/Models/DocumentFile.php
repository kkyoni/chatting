<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class DocumentFile extends Model
{
    use Notifiable;
    use SoftDeletes;

    protected $table = 'document';
    protected $fillable = ['chat_id', 'type', 'file'];
}
