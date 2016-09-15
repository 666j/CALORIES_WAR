$(document).ready(function(){
	InitAllPostings();
});


function InitAllPostings(url){
	$.ajax({
		type:"get",
		url:"php/RequestAllposting.php",
		async:true,
		success:function(data){
			handlerData(data);
		}
	});
	function handlerData(data){
		data = JSON.parse(data);
		console.log(data);
		for(var i = data.length-1;i>0;i--){
			InitPostingForm(data[i].date,data[i].content,data[i].nickname,data[i].id);
		}
		$(".toRemark").on("click",function(){
			var pnode = $(this).parents(".post_wrap");
			var pid = $(pnode).attr("data-pid");
			toRemark(pnode,pid);
		});
		$(".showRemark").on("click",function(){
			var pnode = $(this).parents(".post_wrap");
			var pid = $(pnode).attr("data-pid");
			showRemarkData(pnode,pid);
		});
	}
	
}


function InitPostingForm(date,content,username,pid){                
    var sContent = '<div class="box post_wrap" data-pid ="'+pid+'"><div class="box-header with-border"><h3 class="box-title">'+username+'</h3>'+
					'<time class="ptime">'+date+'</time><div class="box-tools pull-right">'+
            		'<button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="" data-original-title="Collapse">'+
              		'<i class="fa fa-minus"></i></button><button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="" data-original-title="Remove">'+
              		'<i class="fa fa-times"></i></button></div></div><div class="box-body">'+content+'</div><!-- /.box-body -->'+
        			'<div class="box-footer"><div class="col-md-3 col-sm-4 showRemark" style="cursor: pointer"><i class="fa fa-fw fa-commenting-o"></i>查看</div>'+
        			'<div class="col-md-3 col-sm-4 toRemark" style="cursor: pointer"><i class="fa fa-fw fa-edit"></i> 评论 <span class="text-muted">(alias)</span>'+
                    '</div></div><!-- /.box-footer--></div>';
    $(".content").append(sContent);
    
}

function toRemark(pnode,pid){
	var sContent = '<div id="bremark_wrap" class="input-group input-group-sm"><input type="text" id="rcontent" class="form-control">'+
					'<div  id="return_default" class="btn btn-default">返回</div>'+
                   '<span class="input-group-btn"><div id = "cremark" class="btn btn-info btn-flat">发表</div>'+
                   '</span></div>';
    $(pnode).append(sContent);
    $("#cremark").on("click",function(){
    	var content = $("#rcontent").val();
    	var data_info = {"content":content,"pid":pid};
    	console.log(data_info);
    	submitRemarkData(data_info);
    	$("#bremark_wrap").remove();
    });
    $("#return_default").on("click",function(){
    	$("#bremark_wrap").remove();
    });
}

function submitRemarkData(data_info){
	$.ajax({
		type:"post",
		url:"php/toremark.php",
		async:true,
		data:data_info,
		success:function(data){
			handlerData(data);
		}
	});
	function handlerData(data){
		data = JSON.parse(data);
		switch(data.statue){
			case 1:
				alert("发表成功");
//				window.location.href = "ourpostings.html";
				break;
			case 2:
				alert("发表内容不能为空");
				break;
			case -1:
				alert("插入失败");
				break;
		}
	}
}
function showRemarkData(pnode,pid){
	var data_info = {"pid":pid};
	$.ajax({
		type:"post",
		url:"php/showRemark.php",
		async:true,
		data:data_info,
		success:function(data){
			handlerData(data);
		}
	});
	function handlerData(data){
		data = JSON.parse(data);
		console.log(data);
		if(data.statue){
			switch(data.statue){
				case -3:
					alert("没有评论内容");
					break;
				case -1:
					alert("帖子数据出现问题，pid没有成功获取");
					break;
			}
		}else{
			var t = '<h4 class = "show_remark_h">评论<div type="button" class="btn close"'+
			'title="" data-original-title="Remove"><i class="fa fa-times"></i></div></h4>';
			$(pnode).append(t);
			if(data instanceof Array){
				for(var i = 0;i<data.length;i++){
					var sContent = '<p class="aremark" ><span class="rname" style="color:#001A35">'+data[i].remarkername+'：</span>'+data[i].content+
					'<time class="ptime">'+data[i].date+'<time></p>';
	    		   $(pnode).append(sContent);
				}
			}else{
				var sContent = '<p class="aremark"><span class="rname" style="color:#001A35">'+data.remarkername+'：</span>'+data.content+
				'<time class="ptime">'+data.date+'<time></p>';
	    			$(pnode).append(sContent);
			}
			$(".show_remark_h .close").on("click",function(){
				$(".show_remark_h").remove();
				$(".aremark").remove();
			});
			
		}
		
	}
}
