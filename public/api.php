<?php
  header("Access-Control-Allow-Origin: *");
  
  $url = $_SERVER['REQUEST_URI'];

  $parts = parse_url($url);
  parse_str($parts['query'], $query);
  // echo var_dump($parts);
  $query = $parts['query'];

  parse_str($query, $output);

  $last_id = $output['last_id'];

  if ( $last_id ) {
    echo file_get_contents('https://www.instagram.com/chadahouser/media/?max_id=' . $last_id);
  } else {
    echo file_get_contents('https://www.instagram.com/chadahouser/media/');
  }
?>