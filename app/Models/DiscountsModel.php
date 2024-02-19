<?php

namespace App\Models;

use CodeIgniter\Model;

class DiscountsModel extends Model
{
    protected $table = 'discounts';
    protected $allowedFields = ['id', 'product_id', 'discount_precentage', 'start_date', 'end_date'];

    public function getDiscounts()
    {
        $sql = "SELECT * FROM discounts";

        $query = $this->db->query($sql);

        return $query->getResult();
    }
}