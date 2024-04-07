<?php

namespace App\Models;

use CodeIgniter\Model;

class CartModel extends Model
{
    protected $table = 'cart';
    protected $allowedFields = ['id', 'user_id', 'product_id', 'quantity'];

    public function addToCart($userId, $productId, $quantity)
    {
        $query = "SELECT * FROM cart WHERE user_id = ? AND product_id = ?";
        $existingRecord = $this->query($query, [$userId, $productId])->getRow();

        if ($existingRecord) {
            // If the record exists, update the quantity
            $existingQuantity = $existingRecord->quantity;
            $newQuantity = $existingQuantity + $quantity;

            $query = "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?";
            $this->query($query, [$newQuantity, $userId, $productId]);
        } else {
            // If the record doesn't exist, insert a new record
            $query = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
            $this->query($query, [$userId, $productId, $quantity]);
        }
    }

    public function removeOneProduct($userId, $productId)
    {
        // Retrieve the current quantity of the product in the cart
        $query = "SELECT * FROM cart WHERE user_id = ? AND product_id = ?";
        $existingRecord = $this->query($query, [$userId, $productId])->getRow();

        if ($existingRecord) {
            $existingQuantity = $existingRecord->quantity;

            // If the quantity is greater than 1, decrement the quantity
            if ($existingQuantity > 1) {
                $newQuantity = $existingQuantity - 1;

                $query = "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?";
                $this->query($query, [$newQuantity, $userId, $productId]);
            } else {
                // If the quantity is 1, remove the record
                $query = "DELETE FROM cart WHERE user_id = ? AND product_id = ?";
                $this->query($query, [$userId, $productId]);
            }
        }
    }

    public function removeProductFromCart($userId, $productId)
    {
        $query = "DELETE FROM cart WHERE user_id = ? AND product_id = ?";
        $this->query($query, [$userId, $productId]);
    }

    public function removeAllProducts($userId)
    {
        $query = "DELETE FROM cart WHERE user_id = ?";
        $this->query($query, [$userId]);
    }

    public function getFromCart($userId)
    {
        $sql = "SELECT 
        c.id, 
        c.user_id, 
        c.product_id, 
        c.quantity, 
        p.category_id, 
        p.product_info_id, 
        u.unit_name, 
        p.product_name, 
        p.price, 
        p.price_per_unit, 
        IFNULL(MAX(CASE WHEN d.discount_precentage IS NOT NULL AND CURDATE() BETWEEN d.start_date AND d.end_date THEN d.discount_precentage END), NULL) AS discount_precentage, 
        p.image_url
        FROM cart c
        JOIN products p ON c.product_id = p.id
        JOIN units u ON p.unit_id = u.id
        LEFT JOIN discounts d ON p.discount_id = d.id
        WHERE c.user_id = $userId
        GROUP BY p.id";

        $query = $this->db->query($sql);

        return $query->getResult();
    }
}