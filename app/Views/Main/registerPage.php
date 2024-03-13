<div class="cart-layout"> 
    <div class="register-page">
        <div class="register-form">
            <div class="form-name">
                <h1>Izveidot kontu<h1>
            </div>
            <form class="register" id="registerForm" method="post" onsubmit="return validateForm(event)">
                <div class="form-group">
                    <div class="input-text">
                        <label for="email">E-pasts</label>
                        <span class="form-error">*</span>
                    </div>
                    <input class="main-input register-text-input" type="text" id="email" name="email">
                    <span class="form-error email-error"></span>
                </div>
                <div class="form-group">
                    <div class="input-text">
                        <label for="firstname">Vārds</label>
                        <span class="form-error">*</span>
                    </div>
                    <input class="main-input register-text-input" type="text" id="firstname" name="firstname">
                    <span class="form-error firstname-error"></span>
                </div>
                <div class="form-group">
                    <div class="input-text">
                        <label class="input-text" for="lastname">Uzvārds</label>
                        <span class="form-error">*</span>
                    </div>
                    <input class="main-input register-text-input" type="text" id="lastname" name="lastname">
                    <span class="form-error lastname-error"></span>
                </div>
                <div class="form-group">
                    <div class="input-text">
                        <label class="input-text" for="password">Parole</label>
                        <span class="form-error">*</span>
                    </div>
                    <input class="main-input register-text-input" type="password" id="password" name="password">
                    <span class="form-error password-error"></span>
                </div>
                <div class="form-group">
                    <div class="input-text">
                        <label class="input-text" for="password_confirm">Atkārtot paroli</label>
                        <span class="form-error">*</span>
                    </div>
                    <input class="main-input register-text-input" type="password" id="password_confirm" name="password_confirm">
                    <span class="form-error password_confirm-error"></span>
                </div>
                <div class="btn-container">
                    <input class="main-button register-button" type="submit" value="Reģistrēties">
                </div>
                <div class="nav-buttons">
                    <a class="hyperlink" href="/login">Jau ir konts?</a>
                    <a class="hyperlink" href="/">Aiziet uz veikalu</a>
                </div>
            </form> 
        </div>
    </div>
</div>
<script src="<?php echo base_url("registerPage/register.js");?>"></script>