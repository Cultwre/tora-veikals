<div class="cart-layout">
    <div class="profile-page">
        <div class="navbar-profile">
            <a href="/profile/info" class="profile-navbar-button">
                <span class="navbar-text">Profila informācija</span>
                <span class="material-symbols-outlined profile-icon">chevron_right</span>
            </a>
            <a href="#" class="profile-navbar-button">
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
        <div class="profile-update-info profile-info">
            <span class="profile-info-title">Labot profilu</span>
            <form class="update-info" id="updateInfoForm" method="post" onsubmit="return validateFormUpdateInfo(event)">
                <div class="form-group">
                        <div class="input-text">
                            <label for="firstname">Vārds</label>
                            <span class="form-error">*</span>
                        </div>
                        <input class="main-input profile-text-input" type="text" id="firstname" name="firstname">
                        <span class="form-error firstname-error"></span>
                </div>
                <div class="form-group">
                        <div class="input-text">
                            <label for="lastname">Uzvārds</label>
                            <span class="form-error">*</span>
                        </div>
                        <input class="main-input profile-text-input" type="text" id="lastname" name="lastname">
                        <span class="form-error lastname-error"></span>
                </div>
                <div class="form-group">
                        <div class="input-text">
                            <label for="password">Parole</label>
                            <span class="form-error">*</span>
                        </div>
                        <input class="main-input profile-text-input" type="password" id="password" name="password">
                        <span class="form-error password-error"></span>
                </div>
                <div class="btn-container profile-view-btn">
                    <input class="main-button update-info-button" type="submit" value="Saglabāt">
                </div>
            </form>
        </div>
    </div>
</div>