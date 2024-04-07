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

    public function logout()
    {   
        session()->destroy();
        
        // Send a JSON response indicating success
        echo json_encode(['success' => true]);
    }
}