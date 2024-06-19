<div class="cart-layout cartPage-layout">
    <div class="cart-page">
        <div class="header-products">
            <span class="header-text">Mans grozs</span>
        </div>
        <div class="cart-content">
            <div class="products">
                <div class="products-container">
                    <div class="side-cart_empty">
                        <span class="material-symbols-outlined cart-empty">shopping_cart</span>
                        <p>Grozs ir tukšs</p>
                    </div>
                </div>
            </div>
            <div class="buy-container">
                <div class="header-buy-container">
                    <span class="header-buy-text">Pasūtijuma informācija</span>
                </div>
                <div class="total">
                    <span class="header-buy-text">Piegādes maksa</span>
                    <span class="header-buy-text shipping-price">10,00€</span>
                </div>
                <div class="total">
                    <span class="header-buy-text">PVN</span>
                    <span class="header-buy-text pvn-price">0,00€</span>
                </div>
                <div class="total">
                    <span class="header-buy-text">Groza summa</span>
                    <span class="header-buy-text price-of-cart">0,00€</span>
                </div>
                <div class="but-button">
                    <button type="button" class="main-button cart-buttons" id="openModalBtn">Pirkt</button>
                </div>
                <div class="clean-cart">
                    <button type="button" class="main-button cart-buttons remove-all-products">Dzēst produktus</button>
                </div>
            </div>
        </div>
        <div id="modalOverlay" class="modal-overlay">
        <div class="modal">
            <div class="modal-header">
                <span class="font-modal">Pirms uzsākat maksāšanu, norādiet adresi, kur jūs saņemsiet produktus</span>
                <span id="closeModalBtn" class="modal-close">&times;</span>
            </div>
            <div class="modal-body">
                <input class="main-input fetch-address" type="text" id="address" name="address">
                <div id="suggestions"></div>
                <div id="result" class="form-error"></div>
                <div class="modal-price">
                    <span class="font-modal bold-font">Summa apmaksai</span>
                    <span class="font-modal bold-font total-price">0,00€</span>
                </div>
                <!-- <form action='/create_checkout_session' method="POST"> -->
                    <button type="submit" class="main-button cart-buttons confirm-shipping">Pirkt</button>
                <!-- </form> -->
            </div>
        </div>
    </div>
    </div>
</div>