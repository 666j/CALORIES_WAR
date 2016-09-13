<?php
header("Content-Type: text/html; charset=UTF-8");
session_start();
include_once 'opDB.class.php';
$con = new opDB();
//$arr = array();
//$sql = "SELECT * FROM user_food";
//$res = $con->get_result($sql);
//$account=$_SESSION['accout'];
//echo "Pageviews=". $account;
//while($row = mysqli_fetch_assoc($res)){
//	array_push($arr,$row);
//	
//}
//echo json_encode($arr);

$_sql = "select id from food where foodname='米饭'";
	$_res = $con->get_result($_sql);
	$_row = mysqli_fetch_assoc($_res);
	$foodid = json_encode($_row);
	echo $foodid.id;
//Returns TRUE 
exit;
?>
	