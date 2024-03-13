<?php

namespace App\Models;

use CodeIgniter\Model;

class ProductsModel extends Model
{
    protected $table = 'products';
    protected $allowedFields = ['id', 'category_id', 'product_info_id', 'unit_id', 'product_name', 'price', 'price_per_unit', 'discount_id', 'image_url'];

    public function getAllProducts()
    {
        $sql = "SELECT * FROM products";

        $query = $this->db->query($sql);

        return $query->getResult();
    }

    public function getLimitProducts($limit, $offset) 
    {
        $query = $this->db->query("SELECT * FROM products LIMIT $limit OFFSET $offset");

        return $query->getResult(); 
    }

    public function countAllProducts() 
    {   
        $query = $this->db->query("SELECT COUNT(*) as total_products FROM products");
        
        $row = $query->getRow(); // or $row = $query->row_array(); if you want an array

        $total_products = $row->total_products;
        
        return $total_products;
    }
}