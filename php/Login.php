<?php
header("Content-Type: text/html; charset=UTF-8");
include_once 'opDB.class.php';
session_start();
$con = new opDB();
//从结果集中获取所有的数据
$response = array("statue" => '');
if (isset($_POST['account']) && $_POST['account']
    && isset($_POST['password']) && $_POST['password']) {
	$account = test_input($_POST['account']);
	$password = test_input($_POST['password']);
//	$password = md5($password);
	$sql = "SELECT * FROM users WHERE account='{$account}' && password='{$password}'";
	$res = $con->get_result($sql);
	if($row = mysqli_fetch_assoc($res)){
		$response['statue'] = 1;
		
		setSession($row['id'],$row['account'],$row['password'],$row['nickname']);
		$con->for_close();
		echo json_encode($response);
		exit ;
	}else{
		$response['statue'] = -2;
		$con->for_close();
		echo json_encode($response);
		exit ;
	}
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


function setSession($id,$account,$password,$nickname){
	$_SESSION['id'] = $id;
	$_SESSION['account'] = $account; 
	$_SESSION['password'] = $password;
	$_SESSION['nickname'] = $nickname;
	
	setcookie("account",$account, time()+3600);
	setcookie("password",$password,time()+3600);
}

?>