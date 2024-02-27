<?php

namespace App\Validation;
use App\Models\UserCredentialsModel;

class UserValidation
{
    public function validateUser(string $str, string $fields, array $data) {
        $model = model(UserCredentialsModel::class);
        $user = $model->where('email', $data['email'])->first();

        if(!$user) {
            return false;
        } 

        return password_verify($data['password'], $user['password']);
    }
}