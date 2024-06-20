<?php

namespace App\Models;

use CodeIgniter\Model;

class OrdersModel extends Model
{
    protected $table = 'orders';
    protected $allowedFields = ['id', 'user_id', 'created_at', 'delivered_at', 'total_price', 'address', 'status'];

    public function createOrder($user_id, $total_price, $address) 
    {
        $now = date('Y-m-d H:i:s');

        $data = [
            'user_id' => $user_id,
            'delivered_at' => $now, // Assuming delivered_at is set to current time as well
            'total_price' => $total_price,
            'address' => $address,
            'status' => 'delivered'
        ];

        // Construct the SQL query with proper quoting and datetime format
        $sql = "INSERT INTO orders (user_id, delivered_at, total_price, address, status)
                VALUES (?, ?, ?, ?, ?)";

        // Execute the query with data bindings
        $this->db->query($sql, [
            $data['user_id'],
            $data['delivered_at'],
            $data['total_price'],
            $data['address'],
            $data['status']
        ]);


        $insertedId = $this->db->insertID();

        // Store the inserted ID in session
        session()->set('last_inserted_id', $insertedId);

        return $insertedId;
    }

    public function getUserOrders($userId)
    {
        $sql = "SELECT * FROM orders WHERE user_id = $userId";

        $query = $this->db->query($sql);

        return $query->getResult();
    }
}