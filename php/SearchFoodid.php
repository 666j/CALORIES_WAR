
<?php
header("Content-Type: text/html; charset=UTF-8");
include_once 'opDB.class.php';
session_start();
$con = new opDB();
if (isset($_POST['foodname']) && $_POST['foodname']) {
	$foodname = test_input($_POST['foodname']);
	$_sql = "select id from food where foodname = '{$foodname}'";
	$_res = $con->get_result($_sql);
	$_row = mysqli_fetch_assoc($_res);
	echo json_encode($_row);
	$con->for_close();
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