<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  $filterData = file_get_contents("pseudoDB/filterdata.json");

  echo $filterData;
