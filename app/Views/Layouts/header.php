<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tora e-veikals</title>
    <link rel="stylesheet" href="<?php echo base_url('main.css');?>">
    <link rel="stylesheet" href="<?php echo base_url("header/header.css");?>">
    <link rel="stylesheet" href="<?php echo base_url("navbar/navbar.css");?>">
    <link rel="stylesheet" href="<?php echo base_url("homePage/homePage.css");?>">
    <link rel="stylesheet" href="<?php echo base_url("cart/cart.css");?>">
    <link rel="stylesheet" href="<?php echo base_url("footer/footer.css");?>">
    <link rel="stylesheet" href="<?php echo base_url("registerPage/register.css");?>">
    <link rel="stylesheet" href="<?php echo base_url("catalogPage/catalog.css");?>">
    <link rel="stylesheet" href="<?php echo base_url("productPage/product.css");?>">
    <link rel="stylesheet" href="<?php echo base_url("cartPage/cartPage.css");?>">
    <link rel="stylesheet" href="<?php echo base_url("profilePage/profilePage.css");?>">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
    <link rel="icon" href="https://i.ibb.co/tJwpPrH/website2.png">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
</head>
<body>
    <section class="page-header">
        <header>
            <div class="header">
                <a href="/" >
                    <svg id="tora_logo" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176.24 198.89">
                        <defs>
                            <style>
                            .cls-1 {
                                fill: #7950f2;
                            }
                            </style>
                        </defs>
                        <g>
                            <path class="cls-1" d="M228.8,42.2C224.7,49.8,213,73.7,213,74.5c0,.6,6.6.9,18.2.7,10.1-.1,18.9.1,19.5.6,1,.6-.1,4.9-4.1,17.7-3,9.4-7.8,24.4-10.6,33.5s-6.9,21.9-9,28.5-4.9,15.6-6.3,20-5.3,16.8-8.7,27.5c-8.5,26.9-9.9,31.2-10.2,33.5-.3,1.9.3,2,23.6,2.3,15.3.1,24.3-.1,25.1-.8s2-3.6,3-6.8S256,223,257,220s6.4-19.7,12-37,11.4-35.4,13.1-40.3a76.25,76.25,0,0,0,2.9-10.3c0-.9-4.1-13.4-9-27.8-11.7-33.7-11-31.1-11-39.7.1-10.2,4-18.6,10.8-23.1,2.6-1.7,2-1.8-21.5-1.8C230.2,40,230.1,40,228.8,42.2Z" transform="translate(-201.76 -40)"/>
                            <path class="cls-1" d="M289.2,42.9c-8.7,3-13.7,9.4-14.9,19.1-.7,6.3-.1,8.7,11.6,44.5,5.4,16.5,12.2,37.4,15.1,46.5s8.6,26.6,12.6,39,9.1,27.9,11.2,34.5l3.9,12,24.7.3c23.9.2,24.6.2,24.6-1.7a14.39,14.39,0,0,0-.9-4.3c-.6-1.3-3.5-10.4-6.6-20.3s-6-19.1-6.5-20.5-3-9.3-5.5-17.5-5.3-16.8-6-19-2.3-7.2-3.5-11-4.1-13.1-6.5-20.5-6-18.9-8-25.5-4.4-14-5.3-16.3c-1.3-3.8-1.3-4.5-.1-5.3.8-.5,9.4-.9,19.2-.8s18,0,18.3-.3c.6-.7-15.5-33-17-34-.6-.4-13.2-.8-28.1-.8C298,41.1,293.8,41.3,289.2,42.9Z" transform="translate(-201.76 -40)"/>
                        </g>
                    </svg>
                </a>
                <div class="search-container">
                    <div class="search-wrapper">
                        <input class="search-products" type="text" placeholder="Meklēt produktu">
                        <span class="material-symbols-outlined search">search</span>
                    </div>
                    <div class="result-wrapper">
                        <div class="search-result_container">
                            <div class="first-products">
                                
                            </div>
                            <div class="show-more">
                                <a class= "show-more-href" href=''>
                                    <button class="main-button show-more_button">Rādīt vairāk</button>
                                </a>
                            </div>
                            <div class="no-results">
                                <span class="no-results-text">Nav rezultātu</span>
                            </div>
                        </div>
                    </div>
                </div>
                <?php if (session()->get('isLoggedIn')) : ?>
                <a href="/profile/info" class="profile header-buttons">
                    <span class="material-symbols-outlined header-icons">person</span>
                    <span class="hyperlink"><?= session()->get('firstname') ?> <?= session()->get('lastname') ?></span>
                <?php else : ?>
                <a href="/register" class="profile header-buttons">
                    <span class="material-symbols-outlined header-icons">person</span>
                    <span class="hyperlink">Ienākt / Reģistrēties</span>
                <?php endif; ?>
                </a>
                <a href="/product-cart" class="cart header-buttons">
                    <div class="cart-container">
                        <span class="material-symbols-outlined header-icons cart-icon">shopping_cart</span>
                    <div class="badge">0</div>
                </div>
                    <span class="hyperlink">Mans grozs</span>
                </a>
            </div>
        </header>
        <?= $navbarContent ?>
    </section>
    <script>
    const baseUrl = "<?= base_url() ?>";
</script>