
<?php
header("Content-Type: text/html; charset=UTF-8");
include_once 'opDB.class.php';
$con = new opDB();
$date =  date("Y-m-d");
if (isset($_POST['pid']) && $_POST['pid']) {
		$pid = test_input($_POST['pid']);
		$sql = "SELECT u.nickname as remarkername,r.content as content,r.date as date FROM remarks r ,users u,postings p WHERE r.pid = p.id and r.remarkerid = u.id and r.pid = $pid";
		$res = $con->get_result($sql);
		echo json_encode($con->deal_result($res));
		$con->for_close();
		exit ;
}else{
	$response['statue'] = -1;
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