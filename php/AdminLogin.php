<?php
/*
 */
session_start();
header("Content-Type: text/html; charset=UTF-8");
include_once 'opDB.class.php';
$response = array("statue" => '');
$con = new opDB();
$SchoolNum = "";
$password = "";
if (isset($_POST['SchoolNum']) && $_POST['SchoolNum']
    && isset($_POST['password']) && $_POST['password']) {
	$SchoolNum = test_input($_POST['SchoolNum']);
	$password = test_input($_POST['password']);
	$password = md5($password);
	$sql = "SELECT * FROM users WHERE schoolnum='{$SchoolNum}' && password='{$password}'";
	$res = $con->get_result($sql);po
	if($row = mysqli_fetch_assoc($res)){
		$response['statue'] = 1;
		setSession($row['u_id'],$row['grade'],$row['permission'],$SchoolNum,$password);
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
/*
 * 设置 session
 * */
function setSession($id,$account,$password,$nickname){
	$_SESSION['id'] = $id;
	$_SESSION['account'] = $account; 
	$_SESSION['password'] = $password;
	$_SESSION['nickname'] = $nickname;
	
	setcookie("account",$account, time()+3600);
	setcookie("passoword",$password,time()+3600);
}


?>