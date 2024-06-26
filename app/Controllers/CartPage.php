<?php

namespace App\Controllers;

class CartPage extends BaseController
{
    public function index(): string
    {   
        $footerCategories = $this->footerCategories;
        $allCategories = json_encode($this->allCategories);
        
        $cartContent = view('Layouts/cart');
        $navbarContent = view('Layouts/navbar', compact('footerCategories', 'allCategories'));
    
        return view('Layouts/header', compact('navbarContent'))
            . view('Main/cartPage')
            . view('Layouts/footer', compact('footerCategories'));
    }
}