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

        $address = $this->request->getPost('address'); // Adjust 'address' as per your form input name

        // Generate Stripe checkout session and redirect user
        $session = Session::create([
            // Stripe session configuration
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $address,
                    ],
                    'unit_amount' => 2000, // Amount in cents ($20.00)
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => site_url('success'), // Redirect URLs after payment
            'cancel_url' => site_url('cancel'),
        ]);

        return redirect()->to($session->url);
    }

    public function success() {
        return view('success');
    }

    public function cancel() {
        return view('cancel');
    }
}