
<?php
header("Content-Type: text/html; charset=UTF-8");
include_once 'opDB.class.php';
session_start();
$con = new opDB();
$userid = $_SESSION['id'];
$date =  date("Y-m-d");
$date1=date("Y-m-d",mktime(0,0,0,date("m"),date("d"),date("Y")-1));
$sql = "SELECT date,sum(uf.weight*f.Calorie/100) as acal from food f,user_food uf where f.id = uf.foodid and uf.userid = $userid and date between '$date1 'and '$date' group by date";
$res = $con->get_result($sql);
echo json_encode($con->deal_result($res));

?>