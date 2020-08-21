<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Tabs extends Model
{
    public $table = 'tabs';

    public function items()
    {
        return $this->hasMany(Items::class, 'tab_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
