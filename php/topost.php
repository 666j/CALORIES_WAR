<?php
header("Content-Type: text/html; charset=UTF-8");
include_once 'opDB.class.php';
$con = new opDB();
//$response = array("statue" => '');
session_start();
if (isset($_POST['content']) && $_POST['content']) {
	$content = test_input($_POST['content']);
	$userid = $_SESSION['id'];
//	$content = "22233";
//	$userid = 1;
	$date =  date("Y-m-d");
	$_sql = "INSERT INTO postings (userid, date,content) VALUES ($userid, '$date','{$content}')";
	$res = $con->excute_dml($_sql);
	$response['statue'] = $res;//成功
	echo json_encode($response);
}else{
	$response['statue'] = 2;//内容不能为空
	echo json_encode($response);
}

function test_input($data){
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

?>