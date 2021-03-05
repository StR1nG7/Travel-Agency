<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: Content-Type');
  header('Content-Type: application/json');

  $tours = json_decode(file_get_contents("pseudoDB/tours.json"), true);
  $_POST = json_decode(file_get_contents("php://input"), true); // array with current filters
  $currentPage = $_POST['page'];
  $size = $_POST['size'];
  $maxPrice = 0;
  $minPrice = 0;

  foreach ($tours as $key => $value) {
    if ($value['price'] > $maxPrice) {
      $maxPrice = $value['price'];
    }
    if ($key === 0) {
      $minPrice = $value['price'];
    } else {
      if ($value['price'] < $minPrice) {
        $minPrice = $value['price'];
      }
    }
  }

  if ($_POST['currentFilters']) {

    function filterTours($tour, $index) {

      foreach ($_POST['currentFilters'] as $filterName => $filterValue) {
        if ($filterValue === "All") {
          continue;
        }

        if ($filterName === 'price') {
          //проверки для фильтра Цена (вернуть все туры, которые <= указанной цены)
          if (intval($filterValue) < $tour['price']) {
            return false;
          }
        } else {
          // проверки для всех других фильтров
          if (is_array($tour[$filterName])) {
            if (!in_array($filterValue, $tour[$filterName])) {
              return false;
            }
          } else {
            if ($tour[$filterName] != $filterValue) {
              return false;
            }
          }
        }
      }
      return true;
    }

    $tours = array_filter($tours, 'filterTours', ARRAY_FILTER_USE_BOTH);
    $tours = array_values($tours);

  }

  $skip = $currentPage * $size - $size;
  $portion = array_slice($tours, $skip, $size);
  $data = array(
    'count' => count($tours),
    'tours' => $portion,
    'minPrice' => $minPrice,
    'maxPrice' => $maxPrice
  );

  $data = json_encode($data);
  echo $data;
