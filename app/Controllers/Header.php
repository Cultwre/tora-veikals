<?php

namespace App\Controllers;

class Header extends BaseController
{
    public function index()
    {   
        session()->destroy();

        $footerCategories = $this->footerCategories;

        $cartContent = view('Layouts/cart');
        $navbarContent = view('Layouts/navbar');
    
        return view('Layouts/header', compact('navbarContent'))
            . view('Main/homePage', compact('cartContent'))
            . view('Layouts/footer', compact('footerCategories'));;
    }
}