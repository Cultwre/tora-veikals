<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

use App\Controllers\Home;
use App\Controllers\Register;
use App\Controllers\Login;
use App\Controllers\CartPage;
use App\Controllers\Catalog;
use App\Controllers\Header;
use App\Controllers\ProductView;
use App\Controllers\CartFunc;
use App\Controllers\Profile;

$routes->get('getProductsWithDisc', [Home::class, 'getProductsWithDisc']);

$routes->get('register', [Register::class, 'index']);
$routes->post('register', [Register::class, 'register']);

$routes->get('login', [Login::class, 'index']);
$routes->post('login', [Login::class, 'login']);

$routes->get('product-cart', [CartPage::class, 'index']);

// $routes->get('catalog', [Catalog::class, 'index']);
// // $routes->get('getProducts', [Catalog::class, 'getProducts']);
// $routes->post('getProducts', [Catalog::class, 'getProducts']);
$routes->get('catalog(:any)', [Catalog::class, 'index']);
$routes->post('catalog', [Catalog::class, 'getProducts']); // Route for filtering without category
$routes->post('catalog/(:any)', [Catalog::class, 'getProducts']);
$routes->post('catalog/(:any)(:any)', [Catalog::class, 'getProducts']);
$routes->post('catalog/(:any)(:any)(:any)', [Catalog::class, 'getProducts']);

$routes->get('product/(:any)', [ProductView::class, 'index']);
$routes->post('product/(:any)', [ProductView::class, 'getProductInfo']);

$routes->get('logout', [Header::class, 'index']);

$routes->post('add-to-cart', [CartFunc::class, 'addToCart']);
$routes->post('remove-one-product', [CartFunc::class, 'removeOneProduct']);
$routes->post('remove-product-from-cart', [CartFunc::class, 'removeProductFromCart']);
$routes->post('remove-all-products', [CartFunc::class, 'removeAllProducts']);
$routes->get('get-from-cart', [CartFunc::class, 'getFromCart']);

$routes->get('profile/info', [Profile::class, 'index']);
$routes->post('profile/logout', [Profile::class, 'logout']);

