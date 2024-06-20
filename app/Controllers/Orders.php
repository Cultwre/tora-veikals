<?php

namespace App\Controllers;

use App\Models\OrdersModel;
use App\Models\OrderItemModel;

class Orders extends BaseController
{   
    public function orderAdd()
    {   
        $jsonData = $this->request->getJSON();
        $ordersModel = model(OrdersModel::class);

        $user_id = session()->get('id');

        $ordersModel->createOrder($user_id, $jsonData->total_price, $jsonData->address);

        $this->orderItemsAdd(session()->get('last_inserted_id') ,$jsonData->products);

        return true;
    }

    public function orderItemsAdd($order_id ,$products)
    {   
        $orderItemModel = model(OrderItemModel::class);

        foreach (json_decode($products, true) as $product) {
            $orderItemModel->createItemsOrder($order_id, $product['product_id'], $product['quantity'], $product['price']);
        }

        session()->remove('last_inserted_id');

        return true;
    }

    public function getOrders()
    {   
        $ordersModel = model(OrdersModel::class);

        $userId = session()->get('id');

        $this->userOrders =  $ordersModel->getUserOrders($userId);
        $userOrders =  $this->userOrders;

        $this->response->setContentType('application/json');

        $data = array(
            'userOrders' => $userOrders,
        );
        
        return $this->response->setJSON($data);
    }

    public function getOrderDetails($orderId) 
    {
        $orderItemModel = model(OrderItemModel::class);

        $orderDetails = $orderItemModel->getDetails($orderId);

        $this->response->setContentType('application/json');

        $data = array(
            'orderDetails' => $orderDetails,
        );

        return $this->response->setJSON($data);
    }
}