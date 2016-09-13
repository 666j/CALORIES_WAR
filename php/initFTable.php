<!--初始化当日食物表-->

<?php
header("Content-Type: text/html; charset=UTF-8");
include_once 'opDB.class.php';
session_start();
$con = new opDB();

if (isset($_SESSION['id'])) {
		$userid = $_SESSION['id'];
		$sql = "SELECT * FROM food,user_food WHERE food.id = user_food.foodid and user_food.userid='{$userid}'";
		$res = $con->get_result($sql);
		echo json_encode($con->deal_result($res));
		$con->for_close();
		exit ;
}else{
	$response['statue'] = -1;//没有登陆
	$con->for_close();
	echo json_encode($response);
	exit ;
}



?>