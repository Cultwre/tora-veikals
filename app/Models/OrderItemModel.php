<?php

namespace App\Models;

use CodeIgniter\Model;

class OrderItemModel extends Model
{
    protected $table = 'order_items';
    protected $allowedFields = ['id', 'order_id', 'product_id', 'quantity', 'unit_price'];

    public function createItemsOrder($order_id, $product_id, $quantity, $unit_price) 
    {
        $data = [
            'order_id' => $order_id,
            'product_id' => $product_id, // Assuming delivered_at is set to current time as well
            'quantity' => $quantity,
            'unit_price' => $unit_price,
        ];

        // Construct the SQL query with proper quoting and datetime format
        $sql = "INSERT INTO order_items (order_id, product_id, quantity, unit_price)
                VALUES (?, ?, ?, ?)";

        // Execute the query with data bindings
        $this->db->query($sql, [
            $data['order_id'],
            $data['product_id'],
            $data['quantity'],
            $data['unit_price'],
        ]);
    }

    public function getDetails($order_id) 
    {
        $sql = "SELECT order_items.*, products.product_name 
                FROM order_items 
                JOIN products ON order_items.product_id = products.id 
                WHERE order_items.order_id = $order_id";

        $query = $this->db->query($sql);

        return $query->getResult();
    }
}