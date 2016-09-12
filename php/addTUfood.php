<?php
header("Content-Type: text/html; charset=UTF-8");
include_once 'opDB.class.php';
session_start();
$con = new opDB();
$response = array("statue" => '');

if (isset($_POST['foodname']) && $_POST['foodname']
	&&isset($_POST['weight'])&& $_POST['weight']
    && isset($_POST['time']) && $_POST['time']) {
	$foodname = test_input($_POST['foodname']);
	$weight = test_input($_POST['weight']);
	$time = test_input($_POST['time']);
	$date =  date("Y-m-d");
	$userid = $_SESSION['id'];
	$_sql = "select id from food where foodname = '{$foodname}'";
	$_res = $con->get_result($sql);
	$_row = mysqli_fetch_assoc($_res)
	$foodid = $_row.id;
	$sql = "INSERT INTO user_food (userid,foodid, weight,time,date) VALUES ('{$userid}', '{$foodid}','{$weight}','{$time}','{$date}')";
	$res = $con->excute_dml($_sql);
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


function setSession($id,$account,$password,$nickname){
	$_SESSION['id'] = $id;
	$_SESSION['account'] = $account; 
	$_SESSION['password'] = $password;
	$_SESSION['nickname'] = $nickname;
	
	setcookie("account",$account, time()+3600);
	setcookie("password",$password,time()+3600);
}
?>