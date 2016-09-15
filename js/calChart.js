$(document).ready(function(){
	$(".cal_graph").on("click",function(){
		RequestBarData();
		RequstLineData(1);
		
	});
	$("#selectTime").on("change",function(){
		var kind = parseInt($(this).val());
		RequstLineData(kind);
		
	});
});

function RequestBarData(){
	$.ajax({
		type:"get",
		url:"php/RequestCalByTime.php",
		async:true,
		success:function(data){
			handlerData(data);
		}
	});
	function handlerData(data){
		data = JSON.parse(data);
		console.log(data);
		var mydata ={};
		var mydate =[];
		for(var i =0;i<data.length;i++){
			mydate.push(data.date);
		}
//		for(var j = 0;j<mydata.length;j++){
//			
//		}
		var ldate = [],bdata = [],ldata=[],ddata=[],edata=[];
		for(var i  =0;i<data.length;i++){
			if(data[i].time =="早"){
				bdata.push(data[i].acal);
			}else if(data[i].time =="中"){
				ldata.push(data[i].acal);
			}else if(data[i].time =="晚"){
				ddata.push(data[i].acal);
			}else if(data[i].time =="加"){
				edata.push(data[i].acal);
			}
			ldate.push(data[i].date);
		}
//		InitBarGraph(ldate,bdata,ldata,ddata,edata);
		console.log(ldate);
		console.log(bdata);
		console.log(ldata);
		console.log(ddata);
		console.log(edata);
		
	}
}

function InitBarGraph(ldate,bdata,ldata,ddata,edata){
	var areaChartData = {
      labels: ldate,
      datasets: [
        {
          label: "早餐",
          fillColor: "rgba(210, 214, 222, 1)",
          strokeColor: "rgba(210, 214, 222, 1)",
          pointColor: "rgba(210, 214, 222, 1)",
          pointStrokeColor: "#c1c7d1",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: bdata
        },
        {
          label: "中餐",
          fillColor: "rgba(60,141,188,0.9)",
          strokeColor: "rgba(60,141,188,0.8)",
          pointColor: "#3b8bba",
          pointStrokeColor: "rgba(60,141,188,1)",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(60,141,188,1)",
          data: ldata
        },
        {
          label: "晚餐",
          fillColor: "rgba(160,141,118,0.9)",
          strokeColor: "rgba(160,141,118,0.8)",
          pointColor: "#3b8bba",
          pointStrokeColor: "rgba(160,141,118,1)",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(160,141,118,1)",
          data: ddata
        },
        {
          label: "加餐",
          fillColor: "rgba(60,121,148,0.9)",
          strokeColor: "rgba(60,121,148,0.8)",
          pointColor: "#3b8bba",
          pointStrokeColor: "rgba(60,121,148,1)",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(60,121,148,1)",
          data: edata
        }
      ]
    };

   
    //-------------
    //- BAR CHART -
    //-------------
    var barChartCanvas = $("#barChart").get(0).getContext("2d");
    var barChart = new Chart(barChartCanvas);
    var barChartData = areaChartData;
    barChartData.datasets[1].fillColor = "#00a65a";
    barChartData.datasets[1].strokeColor = "#00a65a";
    barChartData.datasets[1].pointColor = "#00a65a";
    var barChartOptions = {
      //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
      scaleBeginAtZero: true,
      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines: true,
      //String - Colour of the grid lines
      scaleGridLineColor: "rgba(0,0,0,.05)",
      //Number - Width of the grid lines
      scaleGridLineWidth: 1,
      //Boolean - Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLines: true,
      //Boolean - Whether to show vertical lines (except Y axis)
      scaleShowVerticalLines: true,
      //Boolean - If there is a stroke on each bar
      barShowStroke: true,
      //Number - Pixel width of the bar stroke
      barStrokeWidth: 2,
      //Number - Spacing between each of the X value sets
      barValueSpacing: 5,
      //Number - Spacing between data sets within X values
      barDatasetSpacing: 1,
      //String - A legend template
      legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
      //Boolean - whether to make the chart responsive
      responsive: true,
      maintainAspectRatio: true
    };

    barChartOptions.datasetFill = false;
    barChart.Bar(barChartData, barChartOptions);
}



function RequstLineData(kind){
	var url_;
	if(kind ==1){
		url_="php/RequestWeekCal.php";
	}else if(kind ==2){
		url_="php/RequestMonthCal.php"
	}
	else if(kind ==3){
		url_="php/RequestYearCal.php"
	}else if(kind ==4){
		url_="php/RequestAllCal.php"
	}
	$.ajax({
		type:"get",
		url:url_,
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
			ddata.push(data[i].acal);
		}
		InitLineGraph(ldate,ddata);
	}
}


function InitLineGraph(ldate,ddata){
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