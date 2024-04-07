<?php

namespace App\Controllers;

use App\Models\CartModel;

class CartFunc extends BaseController
{
    public function addToCart() {
        $cartModel = model(CartModel::class);

        $jsonData = $this->request->getJSON();
        $productId = $jsonData->productId;
        $quantity = $jsonData->quantity;
        $userId = session()->get('id');

        $cartModel->addToCart($userId, $productId, $quantity);

        $this->response->setContentType('application/json');

        return $this->response->setStatusCode(200);
    }

    public function removeOneProduct() {
        $cartModel = model(CartModel::class);

        $jsonData = $this->request->getJSON();
        $productId = $jsonData->productId;
        $userId = session()->get('id');

        $cartModel->removeOneProduct($userId, $productId);

        $this->response->setContentType('application/json');

        return $this->response->setStatusCode(200);
    }

    public function removeProductFromCart() {
        $cartModel = model(CartModel::class);

        $jsonData = $this->request->getJSON();
        $productId = $jsonData->productId;
        $userId = session()->get('id');

        $cartModel->removeProductFromCart($userId, $productId);

        $this->response->setContentType('application/json');

        return $this->response->setStatusCode(200);
    }

    public function removeAllProducts() {
        $cartModel = model(CartModel::class);

        $jsonData = $this->request->getJSON();
        $userId = session()->get('id');

        $cartModel->removeAllProducts($userId);

        $this->response->setContentType('application/json');

        return $this->response->setStatusCode(200);
    }

    public function getFromCart() {
        $cartModel = model(CartModel::class);

        $userId = session()->get('id');

        $this->cartProducts =  $cartModel->getFromCart($userId);
        $cartProducts =  $this->cartProducts;

        $this->response->setContentType('application/json');

        $data = array(
            'cartProducts' => $cartProducts,
        );
        
        return $this->response->setJSON($data);
    }
}