<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;


class Chat extends Model
{
    use Notifiable;
    use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'chat';
    protected $fillable = [
        'sent_from', 'sent_to', 'message', 'is_read','block_flage','sent_from_delete','sent_to_delete'

    ];
    protected $casts = [
        'sent_from' => 'string',
        'sent_to' => 'string',
        'message' => 'string',
        'block_flage' => 'string',
        'is_read' => 'string',
        'sent_from_delete' => 'string',
        'sent_to_delete' => 'string',
        'deleted_at' => 'timestamp',
    ];
    protected function castAttribute($key, $value)
    {
        if (!is_null($value)) {
            return parent::castAttribute($key, $value);
        }
        switch ($this->getCastType($key)) {
            case 'int':
            case 'integer':
                return (int) 0;
            case 'real':
            case 'float':
            case 'double':
                return (float) 0;
            case 'enum':
                return '';
            case 'string':
                return '';
            case 'bool':
            case 'boolean':
                return false;
            case 'object':
            case 'array':
            case 'json':
                return [];
            case 'collection':
                return new BaseCollection();
            case 'date':
                return $this->asDate('0000-00-00');
            case 'datetime':
                return $this->asDateTime('0000-00-00');
            case 'timestamp':
                return '';
            default:
                return $value;
        }
    }
    public function SentFrom()
    {
        return $this->hasOne('App\Models\User', 'id', 'sent_from');
    }
    public function SentTo()
    {
        return $this->hasOne('App\Models\User', 'id', 'sent_to');
    }
    public function Document()
    {
        return $this->hasMany('App\Models\DocumentFile', 'chat_id', 'id');
    }
}
