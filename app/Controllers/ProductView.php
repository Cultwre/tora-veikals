<?php

namespace App\Controllers;

use CodeIgniter\Exceptions\PageNotFoundException;
use App\Models\ProductsModel;

class ProductView extends BaseController
{
    public function index(): string
    {   
        $footerCategories = $this->footerCategories;
        $allCategories = json_encode($this->allCategories);

        $cartContent = view('Layouts/cart');
        $navbarContent = view('Layouts/navbar', compact('footerCategories', 'allCategories'));

        if (!$this->isValidUrl($_SERVER['REQUEST_URI'])) {
            throw PageNotFoundException::forPageNotFound();
        }

        return view('Layouts/header', compact('navbarContent'))
            . view('Main/productPage', compact('cartContent'))
            . view('Layouts/footer', compact('footerCategories'));
    }

    private function isValidUrl($requestedUrl)
    {   
        $productsModel = model(ProductsModel::class); 

        $this->validUrls = $productsModel->getAllProductsIds();
        $validUrls = $this->validUrls;

        $validUrlsWithIds = array_map(function($urlObject) {
            return '/product/' . $urlObject->id;
        }, $validUrls);
    
        return in_array($requestedUrl, $validUrlsWithIds);
    }

    public function getProductInfo($id) {
        $productsModel = model(ProductsModel::class); 

        $this->productInfo = $productsModel->getProductInfo($id);
        $productInfo = $this->productInfo;

        $this->response->setContentType('application/json');

        $data = array(
            'productInfo' => $productInfo,
        );
        
        return $this->response->setJSON($data);
    }
}