
<?php
header("Content-Type: text/html; charset=UTF-8");
include_once 'opDB.class.php';
//session_start();
$con = new opDB();
$sql = "SELECT postings.id,date,nickname,content from postings,users where users.id = postings.userid order by date";
$res = $con->get_result($sql);
echo json_encode($con->deal_result($res));

?>