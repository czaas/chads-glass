<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Chads Glass</title>
  <meta name="description" content="Unique custom glass blowing by Chad Houser">
  <script>
    window.instaData = <?= file_get_contents('https://www.instagram.com/chadahouser/media/'); ?>

    <?= file_get_contents('bundle.js'); ?>
  </script>
  <style>
    <?= file_get_contents('styles/bundle.css'); ?>
  </style>
</head>
<body>
</html>