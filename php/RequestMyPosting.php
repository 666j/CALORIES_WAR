
<?php
header("Content-Type: text/html; charset=UTF-8");
include_once 'opDB.class.php';
session_start();
$con = new opDB();
$userid = $_SESSION['id'];
$sql = "SELECT date,nickname,content from postings,users where users.id = postings.userid and users.id =$userid order by date";
$res = $con->get_result($sql);
echo json_encode($con->deal_result($res));

?>