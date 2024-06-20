<?php

namespace App\Controllers;

use App\Models\UserCredentialsModel;

class Profile extends BaseController
{   
    
    public function index(): string
    {   
        $footerCategories = $this->footerCategories;
        $allCategories = json_encode($this->allCategories);
        
        $cartContent = view('Layouts/cart');
        $navbarContent = view('Layouts/navbar', compact('footerCategories', 'allCategories'));
    
        return view('Layouts/header', compact('navbarContent'))
            . view('Main/profilePage')
            . view('Layouts/footer', compact('footerCategories'));
    }

    public function updateProfileInfoView(): string
    {   
        $footerCategories = $this->footerCategories;
        $allCategories = json_encode($this->allCategories);
        
        $cartContent = view('Layouts/cart');
        $navbarContent = view('Layouts/navbar', compact('footerCategories', 'allCategories'));
    
        return view('Layouts/header', compact('navbarContent'))
            . view('Main/profileUpdateInfo')
            . view('Layouts/footer', compact('footerCategories'));
    }

    public function updateProfilePasswordView(): string
    {   
        $footerCategories = $this->footerCategories;
        $allCategories = json_encode($this->allCategories);
        
        $cartContent = view('Layouts/cart');
        $navbarContent = view('Layouts/navbar', compact('footerCategories', 'allCategories'));
    
        return view('Layouts/header', compact('navbarContent'))
            . view('Main/profileUpdatePassword')
            . view('Layouts/footer', compact('footerCategories'));
    }

    public function logout()
    {   
        session()->destroy();
        
        // Send a JSON response indicating success
        echo json_encode(['success' => true]);
    }

    public function updateProfileInfo()
    {   
        $credentialsModel = model(UserCredentialsModel::class);

        $data = [];
        helper(['form']);

        $rules = [
            'firstname' => 'required',
            'lastname' => 'required',
            'password' => 'required',
        ];

        if ($this->validate($rules)) {

            $userId = session('id');
            $user = $credentialsModel->find($userId);

            $password = $this->request->getVar('password');
            if (password_verify($password, $user['password'])) {
                // Password is correct, update user information
                $credentialsData = [
                    'first_name' => $this->request->getVar('firstname'),
                    'last_name' => $this->request->getVar('lastname'),
                ];
                $credentialsModel->update($userId, $credentialsData);

                $data['success'] = true;

                $userInfo = $credentialsModel->where('email', session('email'))->first();
                $this->setUserMethod($userInfo);
            } else {
            // Password is incorrect
            $data['validation'] = ['password' => 'Incorrect password'];
        }
        } else {
            $data['validation'] = $this->validator->getErrors();
        }

        $this->response->setContentType('application/json');

        return $this->response->setJSON($data);
    }

    public function updateProfilePassword()
    {   
        $credentialsModel = model(UserCredentialsModel::class);

        $data = [];
        helper(['form']);

        $rules = [
            'old_password' => 'required',
            'new_password' => 'required|min_length[8]',
            'new_password_confirm' => 'required|matches[new_password]',
        ];

        if ($this->validate($rules)) {

            $userId = session('id');
            $user = $credentialsModel->find($userId);

            $oldPassword = $this->request->getVar('old_password');
            if (password_verify($oldPassword, $user['password'])) {
                // Password is correct, update user information
                $credentialsData = [
                    'password' => password_hash($this->request->getPost('new_password'), PASSWORD_DEFAULT),
                ];
                $credentialsModel->update($userId, $credentialsData);

                $data['success'] = true;

                $userInfo = $credentialsModel->where('email', session('email'))->first();
                $this->setUserMethod($userInfo);
            } else {
            // Password is incorrect
            $data['validation'] = ['old_password' => 'Incorrect password'];
        }
        } else {
            $data['validation'] = $this->validator->getErrors();
        }

        $this->response->setContentType('application/json');

        return $this->response->setJSON($data);
    }

    public function orderHistory()
    {   
        $footerCategories = $this->footerCategories;
        $allCategories = json_encode($this->allCategories);
        
        $cartContent = view('Layouts/cart');
        $navbarContent = view('Layouts/navbar', compact('footerCategories', 'allCategories'));
    
        return view('Layouts/header', compact('navbarContent'))
            . view('Main/orderHistory')
            . view('Layouts/footer', compact('footerCategories'));
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