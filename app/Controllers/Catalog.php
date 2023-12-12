<?php

namespace App\Controllers;

class Catalog extends BaseController
{
    public function index(): string
    {
        return view('Layouts/header')
        . view('Layouts/navbar')
        . view('Main/productsPage')
        . view('Layouts/cart')
        . view('Layouts/footer');
    }
}