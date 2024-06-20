<?php
namespace App\Controllers;

use \Stripe\Stripe;
use \Stripe\Checkout\Session;
use Config\Services;
use CodeIgniter\Controller;

class StripeController extends Controller {

    public function __construct()
    {
        $this->config = config('Stripe'); // Load Stripe configuration from Config\Services
    }

    public function create_checkout_session()
    {   
        Stripe::setApiKey($this->config->stripe_api_key);

        session()->remove('stripe_metadata');

        $address = $this->request->getPost('address');
        $totalPrice = $this->request->getPost('totalPrice') * 100; 
        $products = json_decode($this->request->getPost('productsArr'), true);

        $productsSummary = [];
        $cartProducts = $products['cartProducts'];

        foreach ($cartProducts as $product) {
            $productsSummary[] = [
                'product_id' => $product['product_id'],
                'quantity' => $product['quantity'],
                'price' => $product['price'],
            ];
        }
        
        $productsJSON = json_encode($productsSummary);

        // Generate Stripe checkout session and redirect user
        $session = Session::create([
            // Stripe session configuration
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => $address,
                    ],
                    'unit_amount_decimal' => $totalPrice, // Amount in cents ($20.00)
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => base_url('succes'), // Redirect URLs after payment
            'cancel_url' => site_url('cancel'),
            'metadata' => [
                'address' => $address,
                'total_price' => $totalPrice,
                'products' => $productsJSON, 
            ],
        ]);

        session()->set('stripe_metadata', [
            'address' => $address,
            'total_price' => $totalPrice / 100, 
            'products' => $productsJSON, 
        ]);

        return redirect()->to($session->url);
    }

    public function success() {
         // Retrieve metadata from the session
         $metadata = session()->get('stripe_metadata');

         // Pass metadata to the view
         $data = [
             'metadata' => $metadata,
         ];
 
         return view('succes', $data);
    }

    public function cancel() {
        return view('cancel');
    }
}