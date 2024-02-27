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

$routes->get('getProductsWithDisc', [Home::class, 'getProductsWithDisc']);

$routes->get('register', [Register::class, 'index']);
$routes->post('register', [Register::class, 'register']);

$routes->get('login', [Login::class, 'index']);
$routes->post('login', [Login::class, 'login']);

$routes->get('cart', [CartPage::class, 'index']);
$routes->get('catalog', [Catalog::class, 'index']);

$routes->get('logout', [Header::class, 'index']);
