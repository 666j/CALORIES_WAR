

<?php
header("Content-Type: text/html; charset=UTF-8");
include_once 'opDB.class.php';
$con = new opDB();
$response = array("statue" => '');

if (isset($_POST['id']) && $_POST['id']) {
	$id = test_input($_POST['id']);
	
	$sql = "delete from user_food where id ='{$id}'";
	$is_have = $con->excute_dml($sql);/***************检查该食物是否存在是否合法**************/
	$response['statue'] = $is_have;
	$con->for_close();
	echo json_encode($response);
	exit;
}
else{
	$response['statue'] = -2;//参数有问题
	$con->for_close();
	echo json_encode($response);
	exit ;
}

function test_input($data){
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

?>