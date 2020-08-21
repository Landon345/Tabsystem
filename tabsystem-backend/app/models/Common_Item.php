<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Common_Item extends Model
{
    public $table = "common_items";

    public function categories(){
        return $this->belongsTo(Category::class);
    }
}
