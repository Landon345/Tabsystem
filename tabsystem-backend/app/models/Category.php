<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public $table = 'categories';

    public function items()
    {
        return $this->hasMany(Items::class);
    }

    public function common_items()
    {
        return $this->hasMany(Common_Item::class);
    }
}
