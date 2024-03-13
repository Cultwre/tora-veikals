<?php

namespace App\Controllers;

use App\Models\ProductsModel;
use App\Models\UnitsModel;
use App\Models\DiscountsModel;

class Catalog extends BaseController
{
    public function index(): string
    {   
        $footerCategories = $this->footerCategories;
        $allCategories = json_encode($this->allCategories);

        $cartContent = view('Layouts/cart');
        $navbarContent = view('Layouts/navbar', compact('footerCategories', 'allCategories'));
    
        return view('Layouts/header', compact('navbarContent'))
            . view('Main/catalogPage', compact('cartContent'))
            . view('Layouts/footer', compact('footerCategories'));
    }

    public function getProducts()
    {   
        $productsModel = model(ProductsModel::class);
        $unitsModel = model(UnitsModel::class);
        $discountsModel = model(DiscountsModel::class);
    
        // $this->products = $productsModel->getAllProducts();
        // $products = $this->products;

        $jsonData = $this->request->getJSON();
        $page = $jsonData->page;
        $limit = $jsonData->limit;
        $offset = ($page - 1) * $limit;
        
        $this->products = $productsModel->getLimitProducts($limit, $offset);
        $products = $this->products;
        $this->totalProducts = $productsModel->countAllProducts();
        $totalProducts = $this->totalProducts;
    
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
    
        $this->response->setContentType('application/json');

        $data = array(
            'products' => $products,
            'totalProducts' => $totalProducts
        );
        
        // return $this->response->setJSON($products);
        return $this->response->setJSON($data);
    }
}