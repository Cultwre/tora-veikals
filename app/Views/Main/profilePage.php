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
        <div class="profile-info">
            <span class="profile-info-title">Profila informācija</span>
            <div class="info-of-user">
                <span class="hyperlink pointer-none">Vārds</span>
                <span class="header-buy-text"><?= session()->get('firstname') ?></span>
            </div>
            <div class="info-of-user">
                <span class="hyperlink pointer-none">Uzvārds</span>
                <span class="header-buy-text"><?= session()->get('lastname') ?></span>
            </div>
            <div class="info-of-user">
                <span class="hyperlink pointer-none">E-pasts</span>
                <span class="header-buy-text"><?= session()->get('email') ?></span>
            </div>
        </div>
    </div>
</div>