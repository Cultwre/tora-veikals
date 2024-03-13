<div class="cart-layout">
    <div class="catalog-page">
        <div class="catalog-filter"></div>
        <div class="catalog-products">
            <div class="products-header">
                <h1 class="catalog-title">Visas preces</h1>
                <div class="header-filtering">
                    <select id="product_count" class="main-input catalog-header_filtering product-count">
                        <option value="20">20</option>
                        <option value="40">40</option>
                        <option value="60">60</option>
                        <option value="80">80</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                    <select id="product_filtering" class="main-input catalog-header_filtering product-filtering">
                        <option value="default">Kārtot pēc</option>
                        <option value="highest-first">Augstākā cena vispirms</option>
                        <option value="lowest-first">Zemākā cena vispirms</option>
                    </select>
                </div>
            </div>
            <div class="products-catalog"></div>
            <div class="products-pagination"></div>
        </div>
    </div>
    <?= $cartContent ?>
</div>
<script src="<?php echo base_url("catalogPage/catalog.js");?>"></script>