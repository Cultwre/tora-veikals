<footer>
    <div class="footer_info">
        <img src="" alt=""> <!-- Te bus logo, bet tas kamer nav izveidots -->
        <h3>Preču kategorijas</h2>
        <ul>
        <?php foreach ($footerCategories as $category): ?>
            <li><a href="#"><?= $category->category_name; ?></a></li>
        <?php endforeach; ?>
        </ul>
        <h3>Informācijai</h3>
        <ul>
            <li><a href="#">Privātuma politika</a></li>
        </ul>
        <h3>Lietotāja profils</h3>
        <ul>
            <li><a href="#">Mans grozs</a></li>
            <li><a href="#">Pasūtijumu vēsture</a></li>
            <li><a href="#">Profils</a></li>
        </ul>
    </div>
    <hr>
    <div class="footer_copyright">
        <p>© 2023</p>
    </div>
</footer>
</body>
</html>