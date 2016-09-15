
<?php
header("Content-Type: text/html; charset=UTF-8");
include_once 'opDB.class.php';
session_start();
$con = new opDB();

if (isset($_POST['weight'])&& $_POST['weight']) {
	$weight = test_input($_POST['weight']);
	$date =  date("Y-m-d");
	$userid = $_SESSION['id'];
	$_sql = "select * from user_weight where date = '$date'";
	$res = $con->excute_dql($_sql);
	if($res ==1){
		$sql = "update user_weight set weight = $weight where userid = '$userid' and date = '$date'";
	}else{
		$sql = "INSERT INTO user_weight (userid, weight,date) VALUES ($userid,$weight,'$date')";
	}
	
	$operate = $con->excute_dml($sql);
	$response['statue'] = $operate;//成
	
	$con->for_close();
	echo json_encode($response);
	exit;
}
else{
	$response['statue'] = -2;//连接数据库问题
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