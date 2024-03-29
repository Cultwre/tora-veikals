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

    public function getRequestedProducts($limit = null, $offset = 0, $categoryIds = null, $filtering = null, $priceLimit = [], $brands = []) 
    {
        // Construct the base SQL query
        $sql = "SELECT
            p.id,
            p.category_id,
            p.product_info_id,
            u.unit_name,
            p.product_name,
            p.price,
            p.price_per_unit,
            IFNULL(MAX(CASE WHEN d.discount_precentage IS NOT NULL AND CURDATE() BETWEEN d.start_date AND d.end_date THEN d.discount_precentage END), NULL) AS discount_precentage,
            p.image_url
        FROM
            products p
        LEFT JOIN
            discounts d ON p.id = d.product_id
        LEFT JOIN
            units u ON p.unit_id = u.id";

        if (!empty($brands)) {
            $brandsString = "'" . implode("', '", $brands) . "'";
            $sql .= " WHERE
            p.id IN (
                 SELECT p2.id
                 FROM products p2
                 LEFT JOIN product_info b ON p2.product_info_id = b.id
                 WHERE b.brand IN ($brandsString)
                 GROUP BY p2.id
             )";
        }

        $sql .= " GROUP BY p.id";

        // Append the WHERE clause if category IDs are provided
        if ($categoryIds !== null && !empty($categoryIds)) {
            $categoryIdsString = implode(',', $categoryIds);
            $sql .= " HAVING p.category_id IN ($categoryIdsString)";
        }

        if (!empty($priceLimit)) {
            $minPrice = $priceLimit[0];
            $maxPrice = $priceLimit[1];
            // Check if a WHERE clause has been added before
            if (strpos($sql, 'HAVING') === false) {
                // If not, add WHERE clause
                $sql .= " HAVING ";
            } else {
                // If yes, add AND to append additional condition
                $sql .= " AND ";
            }
            $sql .= "(p.price - IFNULL(p.price * IFNULL(MAX(CASE WHEN d.discount_precentage IS NOT NULL AND CURDATE() BETWEEN d.start_date AND d.end_date THEN d.discount_precentage END), 0), p.price)) BETWEEN $minPrice AND $maxPrice";
        }

        // Apply filtering based on sorting criteria
        if ($filtering === 'highest-first') {
            $sql .= " ORDER BY IFNULL(p.price - (p.price * IFNULL(MAX(CASE WHEN d.discount_precentage IS NOT NULL AND CURDATE() BETWEEN d.start_date AND d.end_date THEN d.discount_precentage END), 0)), p.price) DESC";
        } elseif ($filtering === 'lowest-first') {
            $sql .= " ORDER BY IFNULL(p.price - (p.price * IFNULL(MAX(CASE WHEN d.discount_precentage IS NOT NULL AND CURDATE() BETWEEN d.start_date AND d.end_date THEN d.discount_precentage END), 0)), p.price) ASC";
        }

        // Append the LIMIT and OFFSET clauses if specified
        if ($limit !== null) {
            $sql .= " LIMIT $limit OFFSET $offset";
        }

        // Execute the query
        $query = $this->db->query($sql);

        // Return the result
        return $query->getResult();
    }


    public function getLimitProducts($limit, $offset, $categoryIds = null) 
    {   
        if ($categoryIds === null || empty($categoryIds)) {
            $query = $this->db->query("SELECT * FROM products LIMIT $limit OFFSET $offset");
        } else {
            // Convert the array of category IDs into a comma-separated string
            $categoryIdsString = implode(',', $categoryIds);

            // Construct the SQL query using the IN operator to match against multiple category IDs
            $query = $this->db->query("SELECT * FROM products WHERE category_id IN ($categoryIdsString) LIMIT $limit OFFSET $offset");
        }
        
        return $query->getResult(); 
    }

        public function countAllProducts($categoryIds = null, $priceLimit = [], $brands = []) 
    {   
        // if ($categoryIds === null || empty($categoryIds)) {
        //     $query = $this->db->query("SELECT COUNT(*) as total_products FROM products");
        // } else {
        //     // Convert the array of category IDs into a comma-separated string
        //     $categoryIdsString = implode(',', $categoryIds);

        //     // Construct the SQL query using the IN operator to match against multiple category IDs
        //     $query = $this->db->query("SELECT COUNT(*) as total_products FROM products WHERE category_id IN ($categoryIdsString)");
        // }

        $sql = 'SELECT COUNT(*) as total_products';

        if (($categoryIds === null || empty($categoryIds)) && empty($priceLimit) && empty($brands)) {
            $sql .= ' FROM products';
            $query = $this->db->query($sql);
        } else {
            $sql .= ' FROM (
                SELECT
                    p.id,
                    p.price
                FROM
                    products p
                LEFT JOIN
                    discounts d ON p.id = d.product_id
                LEFT JOIN
                    units u ON p.unit_id = u.id
                LEFT JOIN
                    product_info b ON p.product_info_id = b.id';
        }

        if ($categoryIds !== null) {
            $categoryIdsString = implode(',', $categoryIds);

            $sql .= " WHERE
            p.category_id IN ($categoryIdsString)";
        }

        if (!empty($brands)) {
            $brandsString = "'" . implode("', '", $brands) . "'";

            // Check if a WHERE clause has been added before
            if (strpos($sql, 'WHERE') === false) {
                // If not, add WHERE clause
                $sql .= " WHERE ";
            } else {
                // If yes, add AND to append additional condition
                $sql .= "AND ";
            }
            $sql .= " b.brand IN ($brandsString)";
        }

        $sql .= ' GROUP BY
        p.id';

        if (!empty($priceLimit)) {
            $minPrice = $priceLimit[0];
            $maxPrice = $priceLimit[1];

            $sql .= " HAVING
            (p.price - IFNULL(p.price * IFNULL(MAX(CASE WHEN d.discount_precentage IS NOT NULL AND CURDATE() BETWEEN d.start_date AND d.end_date THEN d.discount_precentage END), 0), p.price)) BETWEEN $minPrice AND $maxPrice";
        }

        if ($categoryIds !== null || !empty($categoryIds) || !empty($priceLimit) || !empty($brands)) {
            $sql .= ') AS filtered_products;';
            $query = $this->db->query($sql);
        }
        
        $row = $query->getRow(); // or $row = $query->row_array(); if you want an array

        $totalProducts = $row->total_products;
        
        return $totalProducts;
    }

    public function getProductsByCategory($categoryIds = null) 
    {
        // Construct the base SQL query
        $sql = "SELECT
        p.id,
        p.category_id,
        b.brand AS brand,
        p.product_name,
        p.price,
        p.price_per_unit,
        IFNULL(MAX(CASE WHEN d.discount_precentage IS NOT NULL AND CURDATE() BETWEEN d.start_date AND d.end_date THEN d.discount_precentage END), NULL) AS discount_precentage,
        p.image_url
        FROM
            products p
        LEFT JOIN
            discounts d ON p.id = d.product_id
        LEFT JOIN
            units u ON p.unit_id = u.id
        LEFT JOIN
            product_info b ON p.product_info_id = b.id
        GROUP BY
        p.id";
    
        // Append the WHERE clause if category IDs are provided
        if ($categoryIds !== null && !empty($categoryIds)) {
            $categoryIdsString = implode(',', $categoryIds);
            $sql .= " HAVING p.category_id IN ($categoryIdsString)";
        }
    
        // Execute the query
        $query = $this->db->query($sql);
    
        // Return the result
        return $query->getResult();
    }

    public function getAllProductsIds() {
        $sql = "SELECT id FROM products";

        $query = $this->db->query($sql);

        // Return the result
        return $query->getResult();
    }

    public function getProductInfo($id) {
        $sql = "
        SELECT
            p.id,
            u.unit_name,
            p.product_name,
            p.price,
            p.price_per_unit,
            IFNULL(MAX(CASE WHEN d.discount_precentage IS NOT NULL AND CURDATE() BETWEEN d.start_date AND d.end_date THEN d.discount_precentage END), NULL) AS discount_precentage,
            p.image_url,
            pi.brand,
            pi.origin,
            pi.amount,
            pi.producer,
            pi.description,
            nv.energy_kj,
            nv.energy_kcal,
            nv.fat,
            nv.saturated_fat,
            nv.carbo,
            nv.sugar,
            nv.protein,
            nv.salt
        FROM
            products p
        LEFT JOIN
            discounts d ON p.id = d.product_id
        LEFT JOIN
            units u ON p.unit_id = u.id
        LEFT JOIN
            product_info pi ON p.product_info_id = pi.id
        LEFT JOIN
            nutrition_value nv ON pi.nutrition_id = nv.id
        WHERE
            p.id = $id;";

        $query = $this->db->query($sql);

        // Return the result
        return $query->getResult();
    }
}