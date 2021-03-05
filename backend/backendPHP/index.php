<?php
  header('Access-Control-Allow-Origin: *');

  $url = (isset($_GET['q'])) ? $_GET['q'] : '';

  include_once $url . '.php';
