<?php
define('__ROOT__', dirname(dirname(__FILE__)));

require_once(__ROOT__.'/ajax/db.php');
use Api\DB;

$connect = new DB;
$data = $connect->getData();

function changeDateFormat($date) {
    $date = explode('-', $date);
    $date = $date[2].'.'.$date[1].'.'.$date[0];
    return $date;
}

$newArray = [];
foreach ($data as $item) {
    $date = $item['date'];
    $date = changeDateFormat($date);
    if (!isset($newArray[$date])) {
        $newArray[$date] = [$item];
    } else {
        $newArray[$date][] = $item;
    }
}
$json = json_encode($newArray);
echo $json;
