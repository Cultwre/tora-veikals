<?php

namespace App\Models;

use CodeIgniter\Model;

class UserCredentialsModel extends Model
{
    protected $table = 'users';
    protected $allowedFields = ['id', 'email', 'password', 'created_at', 'first_name', 'last_name'];
}