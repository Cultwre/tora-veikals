<?php

namespace App\Controllers;

class Register extends BaseController
{
    public function index(): string
    {   
        $footerCategories = $this->footerCategories;

        return view('Layouts/header')
        . view('Layouts/navbar')
        . view('Main/registerPage')
        . view('Layouts/footer', compact('footerCategories'));
    }
}