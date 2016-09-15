$(document).ready(function(){
	InitAllPostings();
});


function InitAllPostings(){
	$.ajax({
		type:"get",
		url:"php/RequestMyposting.php",
		async:true,
		success:function(data){
			handlerData(data);
		}
	});
	function handlerData(data){
		data = JSON.parse(data);
		console.log(data);
		for(var i = 0;i<data.length;i++){
			InitPostingForm(data[i].date,data[i].content,data[i].nickname);
		}
	}
}

function InitPostingForm(date,content,username){                
    var sContent = '<div class="box post_wrap"><div class="box-header with-border"><h3 class="box-title">'+username+'</h3>'+
					'<time class="ptime">'+date+'</time><div class="box-tools pull-right">'+
            		'<button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="" data-original-title="Collapse">'+
              		'<i class="fa fa-minus"></i></button><button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="" data-original-title="Remove">'+
              		'<i class="fa fa-times"></i></button></div></div><div class="box-body">'+content+'</div><!-- /.box-body -->'+
        			'<div class="box-footer"><div class="col-md-3 col-sm-4"><i class="fa fa-fw fa-commenting-o"></i>查看</div>'+
        			'<div class="col-md-3 col-sm-4"><i class="fa fa-fw fa-edit"></i> 评论 <span class="text-muted">(alias)</span>'+
                    '</div></div><!-- /.box-footer--></div>';
    $(".content").append(sContent);
}
