<?php

namespace App\Models;

use CodeIgniter\Model;

class CategoriesModel extends Model
{
    protected $table = 'product_categories';
    protected $allowedFields = ['id', 'parent_category', 'subparent_category', 'category_name', 'url_name', 'slug'];

    public function getParentCategories()
    {
        $sql = "SELECT id, category_name FROM product_categories WHERE parent_category IS NULL";

        $query = $this->db->query($sql);

        return $query->getResult();
    }

    public function getAllCategories()
    {
        $sql = "SELECT * FROM product_categories";

        $query = $this->db->query($sql);

        return $query->getResult();
    }

    public function getAllUrls()
    {
        $sql = "SELECT url_name FROM product_categories";

        $query = $this->db->query($sql);

        return $query->getResult();
    }

    public function getCategoryIdByUrl($url) 
    {
        $sql = "SELECT id FROM product_categories WHERE url_name = '$url'";

        $query = $this->db->query($sql);

        $row = $query->getRow();
        return $row->id;
    }

    public function getCategoryIdsBySlug($slug) 
    {
        // Escape the slug to prevent SQL injection
        $escapedSlug = $this->db->escapeLikeString($slug);
    
        // Get all categories
        $categories = $this->db->query("SELECT url_name FROM product_categories")->getResult();
    
        // Initialize an array to store the category IDs
        $categoryIds = [];
    
        // Iterate over each category URL
        foreach ($categories as $category) {
            $urlParts = explode('/', $category->url_name);
            // Check if the slug is present in any part of the URL
            if (in_array($escapedSlug, $urlParts)) {
                // If found, get the category ID and add it to the result array
                $categoryId = $this->getCategoryIdByUrl($category->url_name);
                if ($categoryId !== null) {
                    $categoryIds[] = $categoryId;
                }
            }
        }
    
        // Return the array of category IDs
        return $categoryIds;
    }

    public function getCategoryName($categorySlug) 
    {
        $sql = "SELECT category_name FROM product_categories WHERE slug = '$categorySlug'";

        $query = $this->db->query($sql);

        return $query->getResult();
    }
}
