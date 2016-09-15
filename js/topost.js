$(document).ready(function(){
	$("#topost").on("click",function(){
		var content = $("#postContent").val();
		var data_info = {"content":content};
		console.log(data_info);
		SendPost(data_info);
	});
});

function SendPost(data_info){
	console.log(data_info);
	$.ajax({
		type:"post",
		url:"php/topost.php",
		async:true,
		data:data_info,
		success:function(data){
			data = JSON.parse(data);
			console.log(data);
			switch(data.statue){
				case 1:
					alert("发表成功");
					window.location.href = "ourpostings.html";
					break;
				case 2:
					alert("发表内容不能为空");
					break;
				case -1:
					alert("插入失败");
					break;
			}
		}
	});
}
