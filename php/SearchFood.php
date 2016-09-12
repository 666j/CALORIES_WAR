<?php
header("Content-Type: text/html; charset=UTF-8");
include_once 'opDB.class.php';
session_start();
$con = new opDB();

if (isset($_POST['foodname']) && $_POST['foodname']) {
	$foodname = test_input($_POST['foodname']);
//	$password = md5($password);
	$sql = "SELECT * FROM food where foodname like '%$foodname%'";
	$res = $con->get_result($sql);
	echo json_encode($con->deal_result($res));
	$con->for_close();
}else{
	$response['statue'] = -1;
	$con->for_close();
	echo json_encode($response);
	exit ;
}


/*
 * 检查 数据安全性
 * */
function test_input($data){
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}


?>