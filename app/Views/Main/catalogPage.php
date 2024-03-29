<div class="cart-layout">
    <div class="catalog-page">
        <div class="catalog-filter">
            <div class="category-filter"></div>
            <hr class="hr_line cf">
            <div class="price-filter">
                <div class="main-category">
                    <span class="hyperlink filter-category">Cena</span>
                    <span id="price-filter-toggle" class="material-symbols-outlined">remove</span>
                </div>
                <div class="price-filter-visibility">
                    <div class="main-category range-price">
                        <input type="text" name="min" value="0" class="main-input price_filter minPrice" disabled>
                        <span>līdz</span>
                        <input type="text" name="max" value="1000" class="main-input price_filter maxPrice" disabled>
                    </div>
                    <div class="range">
                        <div class="range-slider">
                                <span class="range-selected"></span>
                            </div>
                            <div class="range-input">
                                <input type="range" class="min" min="0" max="1000" value="0" step="0.01">
                                <input type="range" class="max" min="0" max="1000" value="1000" step="0.01">
                            </div>
                        </div>
                    </div>
                </div> 
            <hr class="hr_line pf">
            <div class="brand-filter">
                <div class="main-category">
                    <span class="hyperlink filter-category">Zīmols</span>
                    <span id="brand-filter-toggle" class="material-symbols-outlined">remove</span>
                </div>
                <div class="brand-filter-checkboxes">
                </div>
            </div>
        </div>
        <div class="catalog-products">
            <div class="products-header">
                <h1 class="catalog-title">...</h1>
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
            <div class="products-catalog">
                <div class="product-card x4-products_in-a-row">
                    <div class="loading-container">
                        <div id="loadingSpinner" class="loading-spinner"></div>
                    </div>
                </div>
                <div class="product-card x4-products_in-a-row">
                    <div class="loading-container">
                        <div id="loadingSpinner" class="loading-spinner"></div>
                    </div>
                </div>
                <div class="product-card x4-products_in-a-row">
                    <div class="loading-container">
                        <div id="loadingSpinner" class="loading-spinner"></div>
                    </div>
                </div>
                <div class="product-card x4-products_in-a-row">
                    <div class="loading-container">
                        <div id="loadingSpinner" class="loading-spinner"></div>
                    </div>
                </div>
                <div class="product-card x4-products_in-a-row">
                    <div class="loading-container">
                        <div id="loadingSpinner" class="loading-spinner"></div>
                    </div>
                </div>
                <div class="product-card x4-products_in-a-row">
                    <div class="loading-container">
                        <div id="loadingSpinner" class="loading-spinner"></div>
                    </div>
                </div>
                <div class="product-card x4-products_in-a-row">
                    <div class="loading-container">
                        <div id="loadingSpinner" class="loading-spinner"></div>
                    </div>
                </div>
                <div class="product-card x4-products_in-a-row">
                    <div class="loading-container">
                        <div id="loadingSpinner" class="loading-spinner"></div>
                    </div>
                </div>
                <div class="product-card x4-products_in-a-row">
                    <div class="loading-container">
                        <div id="loadingSpinner" class="loading-spinner"></div>
                    </div>
                </div>
                <div class="product-card x4-products_in-a-row">
                    <div class="loading-container">
                        <div id="loadingSpinner" class="loading-spinner"></div>
                    </div>
                </div>
                <div class="product-card x4-products_in-a-row">
                    <div class="loading-container">
                        <div id="loadingSpinner" class="loading-spinner"></div>
                    </div>
                </div>
                <div class="product-card x4-products_in-a-row">
                    <div class="loading-container">
                        <div id="loadingSpinner" class="loading-spinner"></div>
                    </div>
                </div>
                <div class="product-card x4-products_in-a-row">
                    <div class="loading-container">
                        <div id="loadingSpinner" class="loading-spinner"></div>
                    </div>
                </div>
                <div class="product-card x4-products_in-a-row">
                    <div class="loading-container">
                        <div id="loadingSpinner" class="loading-spinner"></div>
                    </div>
                </div>
                <div class="product-card x4-products_in-a-row">
                    <div class="loading-container">
                        <div id="loadingSpinner" class="loading-spinner"></div>
                    </div>
                </div>
                <div class="product-card x4-products_in-a-row">
                    <div class="loading-container">
                        <div id="loadingSpinner" class="loading-spinner"></div>
                    </div>
                </div>
                <div class="product-card x4-products_in-a-row">
                    <div class="loading-container">
                        <div id="loadingSpinner" class="loading-spinner"></div>
                    </div>
                </div>
                <div class="product-card x4-products_in-a-row">
                    <div class="loading-container">
                        <div id="loadingSpinner" class="loading-spinner"></div>
                    </div>
                </div>
                <div class="product-card x4-products_in-a-row">
                    <div class="loading-container">
                        <div id="loadingSpinner" class="loading-spinner"></div>
                    </div>
                </div>
                <div class="product-card x4-products_in-a-row">
                    <div class="loading-container">
                        <div id="loadingSpinner" class="loading-spinner"></div>
                    </div>
                </div>
            </div>
            <div class="products-pagination"></div>
        </div>
    </div>
    <?= $cartContent ?>
</div>
<script type="module" src="<?php echo base_url("catalogPage/catalog.js");?>"></script>