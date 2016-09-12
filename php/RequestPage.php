<?php
header("Content-Type: text/html; charset=UTF-8");
include_once 'opDB.class.php';
session_start();
$con = new opDB();

$sql = "SELECT count(*) as pnum FROM food";
$res = $con->get_result($sql);
if($row = mysqli_fetch_assoc($res)){
	$con->for_close();
	echo json_encode($row);
	exit ;
}




?>