$(document).ready(function(){
	checkPsw();
  $("#register-submit").on("click",function(){
 	var data_info = {"account":$(".form-control").eq(0).val(),"password":$(".form-control").eq(2).val(),"repassword":$(".form-control").eq(3).val(),"nickname":$(".form-control").eq(1).val()};
	console.log(data_info);
	initTest(data_info);
  });
});

function checkPsw(){
	$(".form-control").eq(3).blur(function(){
		if($(".form-control").eq(2).val()!=$(this).val()){
			alert("密码不一致，请重新设置");
//			$("#register-submit").disabled = true;
		}else{
//			$("#register-submit").disabled = false;
		}
    	
  });
}

function initTest(data_info){
	$.ajax({
		type:"post",
		url:"php/Register.php",
		data:data_info,
		async:true,
		success:function(data){
			console.log(data);
			handlerData(data);
			
		}
	});
	function handlerData(data){
		data = JSON.parse(data);
		switch(data.statue){
			case 1:
				alert("注册成功");
				window.location.href = "login.html";
				break;
			case 2:
				alert("该用户名不可用");
				break;
			case 3:
				alert("密码不一致，请确定两次密码相同");
			case -1:
				alert("连接数据库失败");
		}
	}
}