
<?php
header("Content-Type: text/html; charset=UTF-8");
include_once 'opDB.class.php';
$con = new opDB();
$response = array("statue" => '');

if (isset($_POST['foodname']) && $_POST['foodname']
	&&isset($_POST['imgurl'])&& $_POST['imgurl']
    && isset($_POST['kind']) && $_POST['kind']
	&& isset($_POST['Calorie']) && $_POST['Calorie']) {
	$Calorie = test_input($_POST['Calorie']);
	$foodname = test_input($_POST['foodname']);
	$kind = test_input($_POST['kind']);
	$imgurl = test_input($_POST['imgurl']);
	
	$sql = "SELECT * FROM food WHERE foodname= '{$foodname}'";
	$is_have = $con->excute_dql($sql);/***************检查该食物是否存在是否合法**************/
	if($is_have == -1){
			$_sql = "INSERT INTO food (foodname, imgurl,kind,Calorie) VALUES ('{$foodname}', '{$imgurl}','{$kind}','{Calorie}')";
			$res = $con->excute_dml($_sql);
			$response['statue'] = 1;//成功
	}else{
		$response['statue'] = 2;//食物重复
	}
	$con->for_close();
	echo json_encode($response);
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


function setSession($id,$account,$password,$nickname){
	$_SESSION['id'] = $id;
	$_SESSION['account'] = $account; 
	$_SESSION['password'] = $password;
	$_SESSION['nickname'] = $nickname;
	
	setcookie("account",$account, time()+3600);
	setcookie("password",$password,time()+3600);
}
?>