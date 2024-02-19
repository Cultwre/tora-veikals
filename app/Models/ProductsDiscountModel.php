<?php

namespace App\Models;

use CodeIgniter\Model;

class ProductsDiscountModel extends Model
{
    protected $table = 'products';
    protected $allowedFields = ['id', 'category_id', 'product_info_id', 'unit_id', 'product_name', 'price', 'price_per_unit', 'discount_id', 'image_url'];

    public function getProductsWithDiscount()
    {
        $sql = "SELECT * FROM products WHERE discount_id IS NOT NULL";

        $query = $this->db->query($sql);

        return $query->getResult();
    }
}