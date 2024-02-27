<?php

namespace App\Controllers;

use App\Models\UserCredentialsModel;

class Login extends BaseController
{   
    
    public function index(): string
    {   
        $footerCategories = $this->footerCategories;
        
        $cartContent = view('Layouts/cart');
        $navbarContent = view('Layouts/navbar');
    
        return view('Layouts/header', compact('navbarContent'))
            . view('Main/loginPage')
            . view('Layouts/footer', compact('footerCategories'));
    }

    public function login()
    {   
        $credentialsModel = model(UserCredentialsModel::class);

        $data = [];
        helper(['form']);

        $rules = [
            'email' => 'required|valid_email',
            'password' => 'required|min_length[8]|validateUser[email,password]',
        ];

        $errors = 
        [
            'password' => [
                'validateUser' => 'Email or Password don\'t match'
            ]
        ];

        if ($this->validate($rules, $errors)) {
            $user = $credentialsModel->where('email', $this->request->getVar('email'))->first();

            $this->setUserMethod($user);

            $data['success'] = true;
        } else {
            $data['validation'] = $this->validator->getErrors();
        }

        $this->response->setContentType('application/json');

        return $this->response->setJSON($data);
    }

    private function setUserMethod($user) {
        $data = [
            'id' => $user['id'],
            'firstname' => $user['first_name'],
            'lastname' => $user['last_name'],
            'email' => $user['email'],
            'isLoggedIn' => true,
        ];

        session()->set($data);
        return true;
    }
}
