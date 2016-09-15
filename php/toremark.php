<?php
header("Content-Type: text/html; charset=UTF-8");
include_once 'opDB.class.php';
$con = new opDB();
session_start();
if (isset($_POST['content']) && $_POST['content']
&&isset($_POST['pid']) && $_POST['pid']) {
	$content = test_input($_POST['content']);
	$remarkerid = $_SESSION['id'];
	$pid= test_input($_POST['pid']);
	
	$date =  date("Y-m-d");
	$_sql = "INSERT INTO remarks (pid, remarkerid,content,date) VALUES ($pid, $remarkerid,'{$content}','$date')";
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