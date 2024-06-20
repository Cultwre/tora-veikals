<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="<?php echo base_url('main.css');?>">
</head>
<body>
    <div class="centred">
        <div class="container-success">
            <span class="font-bigger">Maksājums veiksmīgs!</span>
            <div class="hyperlink-container">
                <a href="<?php echo base_url('profile/orders') ?>">
                    <button class="main-button success-button">Aiziet uz pasūtijumu vēsturi</button>
                </a>
                <a href="<?php echo base_url() ?>" class="hyperlink">
                    Aiziet uz veikalu
                </a>
            </div>
        </div>
    </div>
    <script>
        const baseUrl = "<?= base_url() ?>";
        var metadataFromPHP = <?php echo json_encode($metadata); ?>;
    </script>
        <script src="<?php echo base_url("success/success.js");?>"></script>
</body>
</html>