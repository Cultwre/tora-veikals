<?php

namespace App\Models;

use CodeIgniter\Model;

class UnitsModel extends Model
{
    protected $table = 'products';
    protected $allowedFields = ['id', 'unit_name', 'unit_fullname'];

    public function getUnits()
    {
        $sql = "SELECT * FROM units";

        $query = $this->db->query($sql);

        return $query->getResult();
    }
}