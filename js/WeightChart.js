
              
$(document).ready(function(){
	$(".rweight").on("click",function(){
		NoteWeightPop();
	});
	$(".wGraph").on("click",function(){
		RequstWData();
	});
});
function NoteWeightPop(){               
    var sContent = '<div id="record_wrap" class="box box-info"><div class="box-header with-border">'+
    			   '<p id="show_date">今天</p>'+
                    '</div> <!-- /.box-header --><!-- form start --><form class="form-horizontal">'+
              		'<div class="box-body"><div class="form-group">'+
                    '<label for="inputRecordW                                                                                                    " class="col-sm-4 control-label">体重(kg)</label>'+
					'<div class="col-sm-8"><input type="text" class="form-control" id="inputRecordW">'+
                    '</div></div></div><!-- /.box-body --><div class="box-footer">'+
                    '<div  id="return_default" class="btn btn-default">返回</div>'+
	  								'<div id="confirm_weight" class="btn btn-info pull-right">确定</div>';+
                	'</div><!-- /.box-footer --></form></div>'
    $(".sidebar").append(sContent);
   $("#confirm_weight").on("click",function(){
			var weight = parseInt($("#inputRecordW").val());
			var data_info ={"weight":weight};
			console.log(data_info);
			InitWeight(data_info);
			RequstWData();
		});
		$("#return_default").on("click",function(){
			$("#record_wrap").remove();
		});
}

function InitWeight(data_info){
	$.ajax({
		type:"post",
		url:"php/addWeight.php",
		async:true,
		data:data_info,
		success:function(data){
			handlerData(data);
		}
	});
	function handlerData(data){
		data = JSON.parse(data);
		console.log(data);
		switch(data.statue){
			case 1:
				alert("插入成功");
				$("#record_wrap").remove();
				break;
			case -1:
				alert("修改失败");
				break;
			case -2:
				alert("参数传入有问题");
				break;
		}
	}
}



function RequstWData(){
	$.ajax({
		type:"get",
		url:"php/RequestWeight.php",
		async:true,
		success:function(data){
			handlerData(data);
		}
	});
	function handlerData(data){
		data = JSON.parse(data);
		console.log(data);
		var ldate = [],ddata = [];
		for(var i  =0;i<data.length;i++){
			ldate.push(data[i].date);
			ddata.push(data[i].weight);
		}
		InitWgraph(ldate,ddata);
	}
}
function InitWgraph(ldate,ddata){
	var areaChartData = {
      labels: ldate,
      datasets: [
        {
          label: "体重",
          fillColor: "rgba(210, 214, 222, 1)",
          strokeColor: "rgba(210, 214, 222, 1)",
          pointColor: "rgba(210, 214, 222, 1)",
          pointStrokeColor: "#c1c7d1",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: ddata
        }
       
      ]
    };
		var areaChartOptions = {
      //Boolean - If we should show the scale at all
      showScale: true,
      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines: false,
      //String - Colour of the grid lines
      scaleGridLineColor: "rgba(0,0,0,.05)",
      //Number - Width of the grid lines
      scaleGridLineWidth: 1,
      //Boolean - Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLines: true,
      //Boolean - Whether to show vertical lines (except Y axis)
      scaleShowVerticalLines: true,
      //Boolean - Whether the line is curved between points
      bezierCurve: true,
      //Number - Tension of the bezier curve between points
      bezierCurveTension: 0.3,
      //Boolean - Whether to show a dot for each point
      pointDot: false,
      //Number - Radius of each point dot in pixels
      pointDotRadius: 4,
      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth: 1,
      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius: 20,
      //Boolean - Whether to show a stroke for datasets
      datasetStroke: true,
      //Number - Pixel width of dataset stroke
      datasetStrokeWidth: 2,
      //Boolean - Whether to fill the dataset with a color
      datasetFill: true,
      //String - A legend template
      legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
      //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
      maintainAspectRatio: true,
      //Boolean - whether to make the chart responsive to window resizing
      responsive: true
    };
   
     var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
    var lineChart = new Chart(lineChartCanvas);
    var lineChartOptions = areaChartOptions;
    lineChartOptions.datasetFill = false;
    lineChart.Line(areaChartData, lineChartOptions);

}

