
<?php
header("Content-Type: text/html; charset=UTF-8");
include_once 'opDB.class.php';
session_start();
$con = new opDB();

if(isset($_POST['cPage']) && $_POST['cPage']){
	$pnum =test_input($_POST['cPage']-1)*5;
//	$num = test_input($_POST['num']);
	$sql = "SELECT * from food limit $pnum,5";
	$res = $con->get_result($sql);
	echo json_encode($con->deal_result($res));
	$con->for_close();
	exit;
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