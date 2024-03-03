<div class="navbar-container">
    <nav class="navbar" id="navbar">
        <ul class="nav-items">
            <a href="/catalog" class="row-with-gap nav-catalog">
                <span class="material-symbols-outlined">grid_view</span>
                <span class="hyperlink">Visas preces</span>
            </a>
            <div class="categoryContainer">
            <?php foreach ($footerCategories as $category): ?>
            <div dataset="<?= $category->id; ?>" class='hyperlink'><?= $category->category_name; ?></div>
            <?php endforeach; ?>
            </div>
            <a href="/catalog" class="row-with-gap">
                <span class="material-symbols-outlined">savings</span>
                <span class="hyperlink">Atlaides</span>
            </a>
        </ul>
    </nav>
</div>

<script> const allCategories = <?= $allCategories ?></script>
