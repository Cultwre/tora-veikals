<?php

namespace App\Controllers;

class CartPage extends BaseController
{
    public function index(): string
    {
        return view('Layouts/header')
        . view('Layouts/navbar')
        . view('Main/cartPage')
        . view('Layouts/footer');
    }
}