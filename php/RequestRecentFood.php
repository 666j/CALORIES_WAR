<!--请求最近吃的几种食物-->

<?php
header("Content-Type: text/html; charset=UTF-8");
include_once 'opDB.class.php';
session_start();
$con = new opDB();
	$sql = "SELECT * from food where food.id in(select foodid from user_food) limit 0,15";
	$res = $con->get_result($sql);
	echo json_encode($con->deal_result($res));
	$con->for_close();
	exit;
?>