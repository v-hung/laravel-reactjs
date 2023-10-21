<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Test extends Model
{
  public function questions()
  {
    return $this->hasMany(Question::class);
  }

  public function testHistories()
  {
    return $this->hasMany(TestHistory::class);
  }
}
