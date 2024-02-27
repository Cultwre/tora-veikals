<?php

namespace App\Controllers;

use App\Models\UserCredentialsModel;

class Register extends BaseController
{   
    
    public function index(): string
    {   
        $footerCategories = $this->footerCategories;

        // $footerContent = view('Layouts/footer', compact('footerCategories'));
        $cartContent = view('Layouts/cart');
        $navbarContent = view('Layouts/navbar');
    
        return view('Layouts/header', compact('navbarContent'))
            . view('Main/registerPage')
            . view('Layouts/footer', compact('footerCategories'));
    }

    public function register()
    {   
        $credentialsModel = model(UserCredentialsModel::class);

        $data = [];
        helper(['form']);

        $rules = [
            'email' => 'required|valid_email|is_unique[users.email]',
            'password' => 'required|min_length[8]',
            'firstname' => 'required',
            'lastname' => 'required',
            'password_confirm' => 'required|matches[password]'
        ];

        if ($this->validate($rules)) {

            $credentialsData = [
                'email' => $this->request->getPost('email'),
                'password' => password_hash($this->request->getPost('password'), PASSWORD_DEFAULT),
                'first_name' => $this->request->getPost('firstname'),
                'last_name' => $this->request->getPost('lastname'),
            ];

            $credentialsModel->insert($credentialsData);

            $data['success'] = true;
        } else {
            $data['validation'] = $this->validator->getErrors();
        }

        $this->response->setContentType('application/json');

        return $this->response->setJSON($data);
    }
};