$(document).ready(function(){
	var init_col = 1483;
	setMaxCol(init_col);
	InitUFTable(init_col);
	$(".add_food .btn").on("click",function(){
//		$(".modal").css('display','block'); 
		InitPop();
		
	});
});
var all_food_num = 0;
var allPage = 0;

/**********************展示搜索的食物****************************/
function initSTable(data_info){
	$.ajax({
		type:"post",
		url:"php/SearchFood.php",
		async:true,
		data:data_info,
		success:function(data){
			console.log(data);
			handlerData(data);
		}
		
	});
	function handlerData(data){
		data = JSON.parse(data);
		console.log(data);
		$("#food_list tbody").empty();
		var sContent = '<tr><th style="width: 150px;">食物</th><th>热量值(/100g)</th> <th>操作</th></tr>';
		$("#food_list tbody").append(sContent);
		if(data instanceof Array){
			for(var i = 0; i<data.length;i++){
				CfTable(data[i].imgurl,data[i].foodname,data[i].Calorie);
			}
		}else{
			CfTable(data.imgurl,data.foodname,data.Calorie);
		}
		
		$(".pagination").remove();
		$("#food_list").parent(".list_wrap").addClass("scroll");
		console.log(data.statue);
			
	}
}


/**********************请求页数，展示页码****************************/

function InitPage(){
	$.ajax({
		type:"get",
		url:"php/RequestPage.php",
		async:true,
		success:function(data){
			console.log(data);
			handlerData(data);
		}
	});
	function handlerData(data){
		data = JSON.parse(data);
		all_food_num = data.pnum;
		allPage = all_food_num/5;
		var sContent = '<ul class="pagination pagination-sm no-margin pull-right"><li><a href="#">«</a></li>';
		for(var i = 0;i<data.pnum/5;i++){
			sContent+="<li class='cpage'><a href='#'>"+(i+1)+"</a></li>";
		}
	    sContent +='<li><a href="#">»</a></li></ul>';
	    $(".modal .box-footer").append(sContent);
	    $(".cpage").on("click",function(){
	    	var cPage = parseInt($(this).find("a").text());
	    	var data_ = {"cPage":cPage};
	    	console.log(data_);
	    	InitCPageinfo(data_);
	    });
	}
}



/**********************************展示当前页*/
function InitCPageinfo(data_info){
		$.ajax({
			type:"post",
			url:"php/RequestAllFood.php",
			async:true,
			data:data_info,
			success:function(data){
				console.log(data);
				handlerData(data);
			}
			
		});
		function handlerData(data){
			data = JSON.parse(data);
			console.log(data);
			$("#food_list tbody").empty();
			var sContent = '<tr><th style="width: 150px;">食物</th><th>热量值(/100g)</th> <th>操作</th></tr>';
			$("#food_list tbody").append(sContent);
			$("#food_list").parent(".list_wrap").removeClass("scroll");
			for(var i = 0; i<data.length;i++){
				CfTable(data[i].imgurl,data[i].foodname,data[i].Calorie);
			}
			console.log(data.statue);
				
		}
	}




/**********展示食物库的食物的样式***************/
function CfTable(imgurl,foodname,col){
	
	var sContent = '<tr><td><img class="f_img" src="'+imgurl+'">&nbsp;<span  class="fname">'+foodname+'</span></td><td>'+col+'大卡/100g'
				+'</td><td class="b_add_wrap"><span class="f_add">添加</span>/<span class="f_delete">删除</span></td></tr>';
	$("#food_list tbody").append(sContent);
	$(".f_add").on("click",function(){
		var fname = $(this).parents("tr").find(".fname").text();
//		console.log($(this).parents(".b_add_wrap"));
//		console.log(fname);
		addFoodDialog($(this).parent(".b_add_wrap"),fname);
	});
	
}



/***********记录当日所吃的食物***************/
function addUFood(data_info){
//	var data_info = {"foodname":foodname};
	console.log(data_info);
	$.ajax({
		type:"post",
		url:"php/addTUfood.php",
		data:data_info,
		async:true,
		success:function(data){
			console.log(data);
			handlerData(data);                                          
		}
	});
	function handlerData(data){
		data = JSON.parse(data);
//		console.log(data);
//		$("#food_list tbody").empty();
//		var sContent = '<tr><th style="width: 150px;">食物</th><th>热量值(/100g)</th> <th>操作</th></tr>';
//		$("#food_list tbody").append(sContent);
//		for(var i = 0; i<data.length;i++){
//			CfTable(data[i].imgurl,data[i].foodname,data[i].Calorie);
//		}
//		$(".pagination").remove();
//		$("#food_list").parent(".list_wrap").addClass("scroll");
		console.log(data);
	}
}




/************添加食物的弹出框***********************/
function addFoodDialog(pnode,fname){
	var sContent ='<div class="addwrap"><button type="button" class="close" data-dismiss="modal"'+
			'aria-label="Close"><span aria-hidden="true">×</span></button><div class="form-group"><label for="fweight">重量</label>'+
            '<input type="number" class="form-control" id="fweight" placeholder="重量"></div>'+
			'<div class="form-group"><label for="ftime">时间段</label><select class="form-control" id="ftime">'+
  			 '<option value="早">早餐</option><option value="中">中餐</option><option value="晚">晚餐</option>'+
  			 '<option value="加">加餐</option></select></div>'+
  			 '<div id="addtostock" class="btn btn-info pull-right">提交</div></div>';
  	$(pnode).append(sContent);
  	$(".close").on("click",function(){
  		$(".addwrap").remove();
  	});
  	$("#addtostock").on("click",function(){
  		console.log("hhhh");
  		var data_info = {"foodname":fname,"time":$("ftime").val(),"weight":$("#fweight").val()};
  		addUFood(data_info);
  	});
}

	



/********设置每天所能摄入的最大卡路里*******************/
function setMaxCol(col){
	
	$("#all_food .init_col").text("/"+col+"大卡");
	$("#breakfast .init_col").text("/"+col*0.3+"大卡");
	$("#lunch .init_col").text("/"+col*0.4+"大卡");
	$("#dinner .init_col").text("/"+col*0.5+"大卡");
	$("#extra .init_col").text("/"+col*0.6+"大卡");
	
}




/**********初始化每天吃的食物的表*************/
function InitUFTable(init_col){
	$.ajax({
		type:"get",
		url:"php/initFTable.php",
		async:true,
		success:function(data){
			console.log(data);
			handlerData(data);
		}
	});
	function handlerData(data){
		data = JSON.parse(data);
		var all_col =0,b_col=0,l_col = 0,d_col=0,e_col=0,per=0;
		var b_col = 0;
		for(var i = 0;i<data.length;i++){
		
			if(data[i].time =="早"){
				var col = (data[i].weight/100)*data[i].Calorie;
				b_col +=col;
				all_col +=b_col;
				CTable($("#breakfast"),data[i].id,data[i].foodname,data[i].weight,col,b_col);
			}else if(data[i].time=="中"){
				var col = (data[i].weight/100)*data[i].Calorie;
				l_col +=col;
				all_col +=l_col;
				CTable($("#lunch"),data[i].id,data[i].foodname,data[i].weight,col,l_col);
			}else if(data[i].time =="晚"){
				var col = (data[i].weight/100)*data[i].Calorie;
				d_col +=col;
				all_col +=d_col;
				CTable($("#dinner"),data[i].id,data[i].foodname,data[i].weight,col,d_col);
			}else{
				var col = (data[i].weight/100)*data[i].Calorie;
				e_col +=col;
				all_col +=e_col;
				CTable($("#extra"),data[i].id,data[i].foodname,data[i].weight,col,e_col);
			}
			
			checkPer($("#breakfast .badge"),1,b_col,all_col);
			checkPer($("#lunch .badge"),2,l_col,all_col);
			checkPer($("#dinner .badge"),3,d_col,all_col);
			checkPer($("#extra .badge"),4,e_col,all_col);
			checkPer($("#all_food .badge"),0,all_col,init_col);
			$("#all_food .food_col").text(all_col+'大卡');
		 	
		}
		switch(data.statue){
			case -3:
				alert("没有数据");
				break;
			case -1:
				alert("请先登录");
				break;
		}
	}
}




/**************每天所吃食物的展示表***************************/
function CTable(ptable,fid,fname,fweight,fcol,acol,per){
	var sContent = '<tr><td>'+fname+'</td><td>'+fweight+'</td><td>'+fcol+'</td><td>'+
	               '<span class="f_update">修改</span>/<span class="f_delete">删除</span> </td></tr>';
	$(ptable).find( ".table tbody").append(sContent);
	$(ptable).find(".acol").text(acol+"大卡");
}



/**************展示百分比，当百分比超标时改变颜色***********************/
function checkPer(ptable,kind,acol,allcol){
	var per = Math.round(acol/allcol*100);
	$(ptable).text(per+'%');
	var patt = /\bbg\S+/g;;
	var result;
	var has_class = $(ptable).attr("class");
	result= has_class.match(patt);
	$(ptable).removeClass(result[0]);
	if(kind ==1){
		if(per>=30){
			
			$(ptable).addClass("bg-red");
		}else{
			$(ptable).addClass("bg-green");
		}
	}else if(kind ==2){
		if(per>40){
			
			$(ptable).addClass("bg-red");
		}else{
			$(ptable).addClass("bg-green");
		}
	}else if(kind ==3){
		if(per>10){
			$(ptable).addClass("bg-red");
		}else{
			$(ptable).addClass("bg-green");
		}
	}else if(kind ==4){
		if(per>20){
			$(ptable).addClass("bg-red");
		}else{
			$(ptable).addClass("bg-green");
		}
	}
	else if(kind ==0){
		$("#all_food .progress-bar").css("width",per+'%');
		if(per>100){
			$(ptable).addClass("bg-red");
		}else{
			$(ptable).addClass("bg-green");
		}
	}
}



/************添加用户所吃食物**********************/
function addFood(data_info){
	$.ajax({
		type:"post",
		data:data_info,
		url:"php/addfood.php",
		async:true,
		success:function(data){
			console.log(data);
		}
	});
	function handlerData(data){
		
	}
	
}



/********************添加食物相关的弹出框*****************************************/
function InitPop(){
	var sContent = '<div class="example-modal"><div class="modal" style="display:block" ><div class="modal-dialog"><div class="modal-content">'+
              '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
              '<span aria-hidden="true">&times;</span></button><h4 class="modal-title">添加食物</h4>'+
              '</div><div class="modal-body"><div class="box"> <div class="box-header"><h5 class="box-title">'+
			  '<span class="h_span befouse" id="recent_eat" >最近吃过</span>/<span class="h_span" id="fstock">食物库</span>/<span class="h_span" id="not_find">没找到</span>'+
			  '</h3><div class="box-tools"><div class="input-group input-group-sm" style="width: 150px;">'+
			  '<input type="text" name="table_search" id="search_input" class="form-control pull-right" placeholder="Search">'+
			  '<div class="input-group-btn" id="f_search"><button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>'+
			  '</div></div></div></div><!-- /.box-header --><div class="box-body no-padding list_wrap" ><table class="table table-striped" id="food_list">'+
			  '<tr><th style="width: 150px;">食物</th><th >热量值(/100g)</th><th >操作</th></tr></table> </div><!-- /.box-body -->'+
			  '</div><div class="box-footer clearfix"></div></div></div><!-- /.modal-content --></div>'+
          	  '<!-- /.modal-dialog --></div><!-- /.modal --></div>';
    $("#pop").append(sContent);
    
    var data_={"cPage":1};
	initRecentFood();
    $(".close").on("click",function(){
		$("#pop").empty();	
	});
	$("#fstock").on("click",function(){
		$("#addftostock").remove();
		$(".modal .list_wrap").css("display","block");
		$(".h_span").removeClass("befouse");
		$(this).addClass("befouse");
		var data_={"cPage":1};
		InitPage();
		InitCPageinfo(data_);
	});
	$("#recent_eat").on("click",function(){
		$("#addftostock").remove();
		$(".modal .list_wrap").css("display","block");
		$(".h_span").removeClass("befouse");
		$(this).addClass("befouse");
		initRecentFood();
	});
	$("#not_find").on("click",function(){
		$(".h_span").removeClass("befouse");
		$(this).addClass("befouse");
		addFoodtoStock();
	});
	$("#f_search").on("click",function(){
			var data_info ={"foodname":$("#search_input").val()};
			initSTable(data_info);
	});
	$("#search_input").keydown(function(event){
     	var data_info ={"foodname":$(this).val()};
		initSTable(data_info);
    });
}



/********食物库添加食物*************/

function addFoodtoStock(){
	$(".modal .list_wrap").css("display","none");
	$(".pagination ").remove();
	var sContent ='<div id="addftostock" class="form-horizontal"><div class="box-body"><div class="form-group">'+
                  '<label for="inputfname" class="col-sm-2 control-label">食物名称</label>'+
				  '<div class="col-sm-10"><input type="text" class="form-control" id="inputfname" placeholder="食物名称">'+
                  '</div></div><div class="form-group"><label for="inputfcol" class="col-sm-2 control-label">热量</label>'+
				  '<div class="col-sm-10"><input type="text" class="form-control" id="inputfcol" placeholder="热量">'+
                  '</div></div><div class="form-group"><label for="inputfimg" class="col-sm-2 control-label">图片</label>'+
				  '<div class="col-sm-10"><input type="file" class="form-control" id="inputfimg" placeholder="图片">'+
                  '</div></div><div class="form-group"><label for="inputfkind" class="col-sm-2 control-label">种类</label>'+
				  '<div class="col-sm-10"><input type="text" class="form-control" id="inputfkind" placeholder="种类">'+
                  '</div></div><div class="form-group"> <div class="col-sm-offset-2 col-sm-10"><div class="checkbox">'+
                  '<label><input type="checkbox"> Remember me</label></div></div></div></div> <!-- /.box-body -->'+
              	  '<div class="box-footer"><div type="submit" id="returnts" class="btn btn-default">返回</div>'+
                  '<div id="addtostock" class="btn btn-info pull-right">提交</div> </div><!-- /.box-footer --></div>';
	$(".modal-body .box").append(sContent);
	$("#addtostock").on("click",function(){
		var file = $("#inputfimg").val();
		var strFileName=file.replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi,"$1");  //正则表达式获取文件名，不带后缀
		var FileExt=file.replace(/.+\./,"");
		var url ='./img/food/'+strFileName+'.'+FileExt;
		var data_info = {"foodname":$("#inputfname").val(),"Calorie":$("#inputfcol").val(),
		"imgurl":url,"kind":$("#inputfkind").val()};
		 AddDatatoStock(data_info);
		
	});
	$("#returnts").on("click",function(){
		if(confirm("确定返回不再添加")){
			$("#addftostock").remove();
			$(".modal .list_wrap").css("display","block");
			$(".h_span").removeClass("befouse");
			$("#fstock").addClass("befouse");
			var data_={"cPage":1};
			InitPage();
			InitCPageinfo(data_);
		}
	});
	function AddDatatoStock(data_info){
		console.log(data_info);
		$.ajax({
			type:"post",
			url:"php/addtoStock.php",
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
					alert("添加成功");
					break;
				case 2:
					alert("请重新输入食物");
					break;
				case -1:
					alert("连接数据库失败");
					break;
			}
		}
	}
	
}

/**********************展示最近的食物****************************/
function initRecentFood(){
	$.ajax({
		type:"get",
		url:"php/RequestRecentFood.php",
		async:true,
		success:function(data){
			console.log(data);
			handlerData(data);
		}
		
	});
	function handlerData(data){
		data = JSON.parse(data);
		console.log(data);
		$("#food_list tbody").empty();
		var sContent = '<tr><th style="width: 150px;">食物</th><th>热量值(/100g)</th> <th>操作</th></tr>';
		$("#food_list tbody").append(sContent);
		for(var i = 0; i<data.length;i++){
			CfTable(data[i].imgurl,data[i].foodname,data[i].Calorie);
		}
		$(".pagination").remove();
		$("#food_list").parent(".list_wrap").addClass("scroll");
		console.log(data.statue);
			
	}
}