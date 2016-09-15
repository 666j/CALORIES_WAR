

<?php
header("Content-Type: text/html; charset=UTF-8");
include_once 'opDB.class.php';
session_start();
$con = new opDB();
$response = array("statue" => '');

if (isset($_POST['foodid']) && $_POST['foodid']
	&&isset($_POST['weight'])&& $_POST['weight']
    && isset($_POST['time']) && $_POST['time']) {
	$weight = test_input($_POST['weight']);
	$time = test_input($_POST['time']);
	$date =  date("Y-m-d");
	$userid = $_SESSION['id'];
	$foodid =test_input($_POST['foodid']);
	
	$sql = "INSERT INTO user_food (userid,foodid, weight,time,date) VALUES ('{$userid}', '{$foodid}',$weight,'{$time}','{$date}')";
	$res = $con->excute_dml($sql);
	$response['statue'] = 1;//成功

	$con->for_close();
	echo json_encode($response);
	exit;
}
else{
	$response['statue'] = -1;//连接数据库问题
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