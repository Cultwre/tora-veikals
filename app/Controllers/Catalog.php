<?php

namespace App\Controllers;

use CodeIgniter\Exceptions\PageNotFoundException;
use App\Models\ProductsModel;
use App\Models\UnitsModel;
use App\Models\DiscountsModel;
use App\Models\CategoriesModel;

class Catalog extends BaseController
{
    public function index(): string
    {   
        $footerCategories = $this->footerCategories;
        $allCategories = json_encode($this->allCategories);

        $cartContent = view('Layouts/cart');
        $navbarContent = view('Layouts/navbar', compact('footerCategories', 'allCategories'));

        // if (!$this->isValidUrl($_SERVER['REQUEST_URI'])) {
        //     throw PageNotFoundException::forPageNotFound();
        // }

        return view('Layouts/header', compact('navbarContent'))
            . view('Main/catalogPage', compact('cartContent'))
            . view('Layouts/footer', compact('footerCategories'));
    }

    public function getProducts($category = null, $category2 = null, $category3 = null)
    {   
        $productsModel = model(ProductsModel::class);
        $unitsModel = model(UnitsModel::class);
        $discountsModel = model(DiscountsModel::class);
        $categoriesModel = model(CategoriesModel::class);
    
        // $this->products = $productsModel->getAllProducts();
        // $products = $this->products;

        
        $fullPath = '';
        if ($category !== null) {
            $fullPath .= $category;
        }
        if ($category2 !== null) {
            $fullPath.= '/' . $category2;
        }
        if ($category3 !== null) {
            $fullPath .= '/' . $category3;
        }

        $segments = explode('/', $fullPath);

        // Get the last segment
        $lastSegment = end($segments);

        $jsonData = $this->request->getJSON();
        $page = $jsonData->page;
        $limit = $jsonData->limit;
        $offset = ($page - 1) * $limit;
        $filtering = $jsonData->filtering;
        $products = [];
        $totalProducts = 0;
        $categoryName = 'all';
        $allCategories = $categoriesModel->getAllCategories();
        $priceLimit = $jsonData->priceLimit;
        $brands = $jsonData->brands;


        if ($fullPath  === "all" || $fullPath  === null) {
            $this->products = $productsModel->getRequestedProducts($limit, $offset, null, $filtering, $priceLimit, $brands);
            $this->allProducts = $productsModel->getProductsByCategory();
            $products = $this->products;
            $allProducts = $this->allProducts;

            $this->totalProducts = $productsModel->countAllProducts(null, $priceLimit, $brands);
            $totalProducts = $this->totalProducts;

        } else if ($fullPath !== null && strpos($fullPath, "search=") === 0) {
            // Extract search query from $fullPath
            $searchQuery = substr($fullPath, 7); // Remove "search=" part
                
            // You may want to URL decode the search query if needed
            $searchQuery = urldecode($searchQuery);
                
            $this->products = $productsModel->getRequestedProducts($limit, $offset, null, $filtering, $priceLimit, $brands, $searchQuery);
            $this->allProducts = $productsModel->getProductsByCategory();
            $products = $this->products;
            $allProducts = $this->allProducts;
                
            $this->totalProducts = $productsModel->countAllProducts(null, $priceLimit, $brands, $searchQuery);
            $totalProducts = $this->totalProducts;

        } else if ($fullPath !== null) {
            $this->categoriesIds =  $categoriesModel->getCategoryIdsBySlug($lastSegment);
            $categoriesIds =  $this->categoriesIds;

            $this->products = $productsModel->getRequestedProducts($limit, $offset, $categoriesIds, $filtering, $priceLimit, $brands);
            $this->allProducts = $productsModel->getProductsByCategory($categoriesIds);
            $products = $this->products;
            $allProducts = $this->allProducts;

            $this->totalProducts = $productsModel->countAllProducts($categoriesIds, $priceLimit, $brands);
            $totalProducts = $this->totalProducts;
        }

        if ($lastSegment == 'all') {
            $categoryName = 'all';
        } else {
            $categoryName = $categoriesModel->getCategoryName($lastSegment);
        }
    
        $this->response->setContentType('application/json');

        $data = array(
            'products' => $products,
            'totalProducts' => $totalProducts,
            'categoryName' => $categoryName,
            'allCategories' => $allCategories,
            'currentCategorySlug' => $lastSegment,
            'allProducts' => $allProducts,
        );
        
        // return $this->response->setJSON($products);
        return $this->response->setJSON($data);
    }

    private function isValidUrl($requestedUrl)
    {   
        $categoriesModel = model(CategoriesModel::class); 

        $this->validUrls = $categoriesModel->getAllUrls();
        $validUrls = $this->validUrls;

        $validUrlsWithCatalogPrefix = array_map(function($urlObject) {
            return '/catalog/' . $urlObject->url_name;
        }, $validUrls);

        $validUrlsWithCatalogPrefix[] = '/catalog/all';
    
        return in_array($requestedUrl, $validUrlsWithCatalogPrefix);
    }
}

