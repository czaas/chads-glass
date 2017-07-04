<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Chads Glass</title>
  <meta name="description" content="Unique custom glass blowing by Chad Houser">
  <link href="styles/bundle.css" rel="stylesheet">
  <style>
    <?= file_get_contents('./styles/bundle.css'); ?>
  </style>
</head>
<body>
<script>
  window.instaData = <?= file_get_contents('https://www.instagram.com/chadahouser/media/'); ?>

  <?= file_get_contents('./bundle.js'); ?>
</script>
</html>