<?php
namespace App\Models;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Notes extends Model
{
    use Notifiable;

    protected $table = 'notes';
    protected $fillable = ['user_id','title','description','status'];
}
