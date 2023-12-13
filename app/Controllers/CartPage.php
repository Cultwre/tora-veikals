<?php

namespace App\Controllers;

class CartPage extends BaseController
{
    public function index(): string
    {   
        $footerCategories = $this->footerCategories;

        return view('Layouts/header')
        . view('Layouts/navbar')
        . view('Main/cartPage')
        . view('Layouts/footer', compact('footerCategories'));
    }
}