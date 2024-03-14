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

        if (!$this->isValidUrl($_SERVER['REQUEST_URI'])) {
            throw PageNotFoundException::forPageNotFound();
        }

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

        $jsonData = $this->request->getJSON();
        $page = $jsonData->page;
        $limit = $jsonData->limit;
        $offset = ($page - 1) * $limit;
        $filtering = $jsonData->filtering;
        $products = [];
        $totalProducts = 0;

        if ($fullPath  === "all" || $fullPath  === null) {
            $this->products = $productsModel->getLimitProducts($limit, $offset);
            $products = $this->products;

            $this->totalProducts = $productsModel->countAllProducts();
            $totalProducts = $this->totalProducts;
        } else if ($fullPath !== null) {
            $this->categoriesId =  $categoriesModel->getCategoryIdByUrl($fullPath);
            $categoriesId =  $this->categoriesId;

            $this->products = $productsModel->getLimitProducts($limit, $offset, $categoriesId);
            $products = $this->products;

            $this->totalProducts = $productsModel->countAllProducts($categoriesId);
            $totalProducts = $this->totalProducts;
        }
    
        $units = $unitsModel->getUnits();
        $discounts = $discountsModel->getDiscounts();
    
        function filterProductsByDiscounts($products, $discounts) {
            // Create a lookup array for discounts using product_id as the key
            $discountsLookup = [];
            foreach ($discounts as $discount) {
                $productId = $discount->product_id;
                $discountsLookup[$productId][] = $discount;
            }
        
            // Function to check if a product has valid discounts
            function hasValidDiscounts($product, $discountsLookup) {
                $productId = $product->id;
        
                if (isset($discountsLookup[$productId])) {
                    $discounts = $discountsLookup[$productId];
                    $today = strtotime('today');
        
                    foreach ($discounts as $discount) {
                        $endDate = strtotime($discount->end_date);
        
                        if ($endDate >= $today) {
                            return true; // Product has at least one valid discount
                        }
                    }
                }
        
                return false; // Product has no valid discounts
            }
        
            // Filter products to keep all products, including those with discount_id set to null
            $filteredProducts = array_map(function ($product) use ($discountsLookup) {
                $product->hasValidDiscounts = hasValidDiscounts($product, $discountsLookup);
                return $product;
            }, $products);
        
            // Return the filtered array
            return $filteredProducts;
        }
        
        $products = filterProductsByDiscounts($products, $discounts);
    
        $unitsLookup = array_column($units, 'unit_name', 'id');
        $discountsLookup = [];

        foreach ($discounts as $discount) {
            if (strtotime($discount->end_date) >= strtotime('today')) {
                if (!isset($discountsLookup[$discount->product_id])) {
                    $discountsLookup[$discount->product_id] = [];
                }
    
                $discountsLookup[$discount->product_id][] = $discount;
            }
        }
    
        foreach ($products as &$product) {
            if (isset($unitsLookup[$product->unit_id])) {
                $product->unit_id = $unitsLookup[$product->unit_id];
            }
    
            if (isset($discountsLookup[$product->id])) {
                $validDiscounts = $discountsLookup[$product->id];
    
                // Find the discount with the highest percentage
                $highestPercentageDiscount = null;
                foreach ($validDiscounts as $discount) {
                    if (!$highestPercentageDiscount || $discount->discount_precentage > $highestPercentageDiscount->discount_precentage) {
                        $highestPercentageDiscount = $discount;
                    }
                }
    
                // Choose the valid discount with the highest percentage
                if ($highestPercentageDiscount && strtotime($highestPercentageDiscount->end_date) >= strtotime('today')) {
                    $product->discount_id = $highestPercentageDiscount->discount_precentage;
                }
            } else {
                // If the product has no valid discounts, you can set default values or leave them as is
                // Example: Set discount_id to 0 or null
                $product->discount_id = null;
            }
        }       

        switch ($filtering) {
            case 'highest-first':
                usort($products, function ($a, $b) {
                    $priceA = $a->discount_id ? $a->price - ($a->discount_id * $a->price) : $a->price;
                    $priceB = $b->discount_id ? $b->price - ($b->discount_id * $b->price) : $b->price;
                    return floatval($priceB) <=> floatval($priceA); // Sort in descending order for highest first
                });
                break;
            case 'lowest-first':
                usort($products, function ($a, $b) {
                    $priceA = $a->discount_id ? $a->price - ($a->discount_id * $a->price) : $a->price;
                    $priceB = $b->discount_id ? $b->price - ($b->discount_id * $b->price) : $b->price;
                    return floatval($priceA) <=> floatval($priceB); // Sort in ascending order for lowest first
                });
                break;
            default:
                break;
        }
    
        $this->response->setContentType('application/json');

        $data = array(
            'products' => $products,
            'totalProducts' => $totalProducts,
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

