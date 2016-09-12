$("#login-submit").on("click",function(){
		console.log("hhhhh");
		var data_info = {"account":$("#user-login").val(),"password":$("#password-login").val()};
		console.log(data_info);
		initTest(data_info);
});
function initTest(data_info){
	$.ajax({
		type:"post",
		url:"php/Login.php",
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
				alert("登陆成功");
				window.location.href = "record.html";
				break;
			case -2:
					alert("账号或者密码错误");
				break;
			case -1:
				alert("连接数据库失败")
		}
	}
}