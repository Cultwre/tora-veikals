<?php

namespace App\Models;

use CodeIgniter\Model;

class CategoriesModel extends Model
{
    protected $table = 'product_categories';
    protected $allowedFields = ['id', 'parent_category', 'subparent_category', 'category_name', 'url_name'];

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
}
