<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Items extends Model
{
    public $table = 'items';

    public function tabs()
    {
        return $this->belongsTo(Tabs::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
