var charts = angular.module("charts",[]);

charts.directive('barChart', function(){
	function link(scope, element, attr){
		function draw(){

			d3.select(element[0]).selectAll("svg").remove();

			var svg = d3.select(element[0])
				.append("svg")
				;


			var dims = {
				width: 300,
				height: 240,
				margins: {
					top: 20,
					bottom:20,
					left: 45,
					right: 15
				}
			}

			svg.attr({width: dims.width+"px", height: dims.height+"px"});


			dims.height = dims.height - dims.margins.top  - dims.margins.bottom;
			dims.width  = dims.width  - dims.margins.left - dims.margins.right;

			var yValues = scope.data.y;

			var xValues = scope.data.x;

			var yScale = d3.scale
						.linear()
						.range([dims.height,0])
						.domain([0,d3.max(yValues)])

			var yAxis = d3.svg.axis()
							.scale(yScale)
							.orient("left")
							.ticks(5)
							;

			svg.append("g")
				.attr("class", "y axis")
				.attr("transform", "translate(33,"+dims.margins.top+")" )
				.call(yAxis);

			

			svg.selectAll(".bars")
				.data(yValues)
				.enter()
				.append("rect")
				.attr("class","bars")
				.attr("width",function(d){return dims.width/yValues.length-2;})
				.attr("height",function(d){return dims.height-yScale(d);})
				.attr("x",function(d,i){return dims.margins.left+(dims.width/yValues.length)*i;})
				.attr("y",function(d){return dims.margins.top+yScale(d);})

			d3.select(element[0]).selectAll(".bars").data(yValues).exit().remove();

			
			svg.selectAll(".xLabels")
				.data(xValues).enter()
				.append("text")
				.attr("class","xLabels")
				.text(function(d,i){return xValues[i]})
				.attr("x",function(d,i){return dims.margins.left+(dims.width/yValues.length)*(i+0.5)-this.getComputedTextLength()/2 ;})
				.attr("y", dims.height+dims.margins.top+dims.margins.bottom/2+4)
				.style("font-size","15px");

			}

			scope.$watch("data",draw,true);

			draw();
		}
			return {
				link: link,
				restrict: 'E',
				scope: {data: '='}
			}
	});

charts.directive("pieChart",function(){
	function link(scope, element, attr){
		var width = element[0].clientWidth, height = element[0].clientHeight;

		function draw(){

		console.log("draw");
		var pieces = scope.data;
		var pie = d3.layout.pie();
        var pieData = pie(pieces);


		console.log(pieces);

		d3.select(element[0]).selectAll("svg").remove();

		var svg = d3.select(element[0])
			.append("svg").attr({width: width, height: height})
			.append("g")
			.attr("transform","translate("+width/2+","+height/2+")")
			;

		var colors = d3.scale.category20();
		var arc = d3.svg.arc().innerRadius(0.7*width/2).outerRadius(width/2);


		svg.selectAll("path").data(pieData).enter()
			.append("path")
			.attr({d: arc})
			.attr("class","test")
			.style({fill: function(d,i){ return colors(i); },
				stroke: "white",
				"stroke-width": "0px"
				});

		d3.select(element[0]).selectAll(".test").data(pieData).exit().remove();

        }

		draw(scope.data);

		scope.$watch(element,function(){

			console.log("dffsd "+element[0].clientWidth);
		});

		scope.$watch("data",draw,true);
	}
	return {
		link: link,
		restrict: 'E',
		scope: {data: '=' }
	}
});
