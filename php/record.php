<?php
header("Content-Type: text/html; charset=UTF-8");
include_once 'opDB.class.php';
$con = new opDB();
$sql = "SELECT * FROM food WHERE foodname='米饭'";
$res = $con->get_result($sql);
if($row = mysqli_fetch_assoc($res)){
	$response['statue'] = 1;
//	setSession($row['id'],$row['foodname'],$row['password'],$row['nickname']);
	$con->for_close();
	
	echo json_encode($row);
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