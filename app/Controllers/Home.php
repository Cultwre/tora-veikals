<?php

namespace App\Controllers;

use App\Models\ProductsDiscountModel;
use App\Models\DiscountsModel;
use App\Models\UnitsModel;

class Home extends BaseController
{
    public function index(): string
    {   
        $footerCategories = $this->footerCategories;

        // $footerContent = view('Layouts/footer', compact('footerCategories'));
        $cartContent = view('Layouts/cart');
        $navbarContent = view('Layouts/navbar');
    
        return view('Layouts/header', compact('navbarContent'))
            . view('Main/homePage', compact('cartContent'))
            . view('Layouts/footer', compact('footerCategories'));
    }

    public function getDiscounts()
    {       
        $model = model(DiscountsModel::class);

        $this->discounts = $model->getDiscounts();
        $discounts = $this->discounts;

        return $discounts;
    }

    public function getUnits()
    {       
        $model = model(UnitsModel::class);

        $this->units = $model->getUnits();
        $units = $this->units;

        return $units;
    }

    public function getProductsWithDisc()
    {       
        $model = model(ProductsDiscountModel::class);

        $this->productsWithDiscount = $model->getProductsWithDiscount();
        $productsWithDiscount = $this->productsWithDiscount;

        $units = $this->getUnits();
        $discounts = $this->getDiscounts();

        function filterProductsByDiscounts($productsWithDiscount, $discounts) {
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
        
            // Filter products to keep only those with valid discounts
            $filteredProducts = array_filter($productsWithDiscount, function ($product) use ($discountsLookup) {
                return hasValidDiscounts($product, $discountsLookup);
            });
        
            // Return the filtered array
            return array_values($filteredProducts);
        }
        
        $productsWithDiscount = filterProductsByDiscounts($productsWithDiscount, $discounts);

        $unitsLookup = array_column($units, 'unit_name', 'id');
        $discountsLookup = [];

        // Create an associative array with product_id as the key and an array of valid discounts as the value
        foreach ($discounts as $discount) {
            if (strtotime($discount->end_date) >= strtotime('today')) {
                if (!isset($discountsLookup[$discount->product_id])) {
                    $discountsLookup[$discount->product_id] = [];
                }

                $discountsLookup[$discount->product_id][] = $discount;
            }
        }

        foreach ($productsWithDiscount as &$product) {
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
            }
        }       

        $this->response->setContentType('application/json');
        
        return $this->response->setJSON($productsWithDiscount);
    }
}
