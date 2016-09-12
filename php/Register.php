<?php
header("Content-Type: text/html; charset=UTF-8");
include_once 'opDB.class.php';
$con = new opDB();
$response = array("statue" => '');

if (isset($_POST['account']) && $_POST['account']
	&&isset($_POST['nickname'])&& $_POST['nickname']
    && isset($_POST['password']) && $_POST['password']) {
	$account = test_input($_POST['account']);
	$password = test_input($_POST['password']);
	$repassword = test_input($_POST['repassword']);
	$nickname = test_input($_POST['nickname']);
	


	$sql = "SELECT * FROM users WHERE account= '{$account}'";
	$is_have = $con->excute_dql($sql);/***************检查账号是否合法**************/
	if($is_have == -1){
//		var_dump($password);
		if($password !=$repassword){
			$response['statue'] = 3;//密码不一致
		}else{
			$password = md5($password);
			$_sql = "INSERT INTO users (account, password,nickname) VALUES ('{$account}', '{$password}','{$nickname}')";
			$res = $con->excute_dml($_sql);
			$response['statue'] = 1;//成功
		}
		
	}else{
		$response['statue'] = 2;//账号重复
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
	
//	if($row = mysqli_fetch_assoc($res)){
//		$response['statue'] = 1;
//		setSession($row['id'],$row['account'],$row['password'],$row['nickname']);
//		$con->for_close();
//		echo json_encode($response);
//		exit ;
//	}else{
//		$response['statue'] = -2;
//		$con->for_close();
//		echo json_encode($response);
//		exit ;
//	}
//}else{
//	$response['statue'] = -1;
//	$con->for_close();
//	echo json_encode($response);
//	exit ;
//}

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