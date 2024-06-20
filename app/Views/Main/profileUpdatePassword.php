<div class="cart-layout">
    <div class="profile-page">
        <div class="navbar-profile">
            <a href="/profile/info" class="profile-navbar-button">
                <span class="navbar-text">Profila informācija</span>
                <span class="material-symbols-outlined profile-icon">chevron_right</span>
            </a>
            <a href="/profile/orders" class="profile-navbar-button">
                <span class="navbar-text">Pasūtijumu vēsture</span>
                <span class="material-symbols-outlined profile-icon">chevron_right</span>
            </a>
            <a href="/profile/update" class="profile-navbar-button">
                <span class="navbar-text">Labot profilu</span>
                <span class="material-symbols-outlined profile-icon">chevron_right</span>
            </a>
            <a href="/profile/update-password" class="profile-navbar-button">
                <span class="navbar-text">Mainīt paroli</span>
                <span class="material-symbols-outlined profile-icon">chevron_right</span>
            </a>
            <a href="#" class="profile-navbar-button logout-link">
                <span class="navbar-text">Iziet no profila</span>
                <span class="material-symbols-outlined profile-icon">chevron_right</span>
            </a>
        </div>
        <div class="profile-update-password profile-info">
            <span class="profile-info-title">Mainīt paroli</span>
            <form class="update-password" id="updatePasswordForm" method="post" onsubmit="return validateFormUpdatePassword(event)">
                <div class="form-group">
                        <div class="input-text">
                            <label for="old_password">Veca parole</label>
                            <span class="form-error">*</span>
                        </div>
                        <input class="main-input profile-text-input" type="password" id="old_password" name="old_password">
                        <span class="form-error old_password-error"></span>
                </div>
                <div class="form-group">
                        <div class="input-text">
                            <label for="new_password">Jauna parole</label>
                            <span class="form-error">*</span>
                        </div>
                        <input class="main-input profile-text-input" type="password" id="new_password" name="new_password">
                        <span class="form-error new_password-error"></span>
                </div>
                <div class="form-group">
                        <div class="input-text">
                            <label for="new_password_confirm">Atkartoti jauna parole</label>
                            <span class="form-error">*</span>
                        </div>
                        <input class="main-input profile-text-input" type="password" id="new_password_confirm" name="new_password_confirm">
                        <span class="form-error new_password_confirm-error"></span>
                </div>
                <div class="btn-container profile-view-btn">
                    <input class="main-button update-info-button" type="submit" value="Saglabāt">
                </div>
            </form>
        </div>
    </div>
</div>