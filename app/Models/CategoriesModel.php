<?php

namespace App\Models;

use CodeIgniter\Model;

class CategoriesModel extends Model
{
    protected $table = 'product_categories';
    protected $allowedFields = ['id', 'parent_category', 'category_name'];

    public function getParentCategories()
    {
        $sql = "SELECT category_name FROM product_categories WHERE parent_category IS NULL";

        $query = $this->db->query($sql);

        return $query->getResult();
    }
}
