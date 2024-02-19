<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

use App\Controllers\Home;
use App\Controllers\Register;
use App\Controllers\CartPage;
use App\Controllers\Catalog;

$routes->get('getProductsWithDisc', [Home::class, 'getProductsWithDisc']);

$routes->get('register', [Register::class, 'index']);
$routes->get('cart', [CartPage::class, 'index']);
$routes->get('catalog', [Catalog::class, 'index']);
