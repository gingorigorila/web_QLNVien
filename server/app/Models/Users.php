<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    use HasFactory;
    protected $table = 'Users';
    protected $fillable =['id','email','password','name','role','phone_number','address','created_at','updated_at'];
}
