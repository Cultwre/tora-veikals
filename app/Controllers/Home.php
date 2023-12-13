<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index(): string
    {   
        $footerCategories = $this->footerCategories;

        return view('Layouts/header')
        . view('Layouts/navbar')
        . view('Main/homePage')
        . view('Layouts/cart')
        . view('Layouts/footer', compact('footerCategories'));
    }
}
