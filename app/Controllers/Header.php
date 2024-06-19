<?php

namespace App\Controllers;

use App\Models\ProductsModel;

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

    public function searchForProducts()
    {   
        $jsonData = $this->request->getJSON();
        $productsModel = model(ProductsModel::class);

        $searchedProducts = $productsModel->getSearchedProducts($jsonData->query);

        return json_encode($searchedProducts);
    }
}