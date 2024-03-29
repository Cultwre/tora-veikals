<div class="cart-layout">
    <div class="product-page">
        <div class="product-overview product-container">
            <div class="image-of-product">
                <img src="" class="product-image-view">
            </div>
            <div class="product-main_info">
                <span class="catalog-title product_name"></span>
                <div class="product-prices-container">
                    <div class="product-price_discount view_price_discount">
                        <span class="product-price view_price"></span>
                    </div>
                    <span class="product-price_per-unit view_price-per-unit"></span>
                </div>
                <div class="product-cart-controller">
                    <button type="button" class="main-button product_view-button">Ielikt grozā</button>
                </div>
                <span class="hyperlink" id="go-back">Aiziet atpakaļ</span>
            </div>
        </div>
        <div class="container-title">
            <span class="catalog-title">Par produktu</span>
        </div>
        <div class="product_info product-container"></div>
    </div>
    <?= $cartContent ?>
</div>

<script src="<?php echo base_url("productPage/product.js");?>"></script>

