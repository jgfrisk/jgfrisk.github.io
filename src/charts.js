var charts = angular.module("charts",[]);

charts.directive('barChart', function(){
	function link(scope, element, attr){
		var svg = d3.select(element[0])
				.append("svg")
				;

			console.log(element[0])

			var dims = {
				width: 300,
				height: 240,
				margins: {
					top: 20,
					bottom:15,
					left: 45,
					right: 15
				}
			}

			svg.attr({width: dims.width+"px", height: dims.height+"px"});


			dims.height = dims.height - dims.margins.top  - dims.margins.bottom;
			dims.width  = dims.width  - dims.margins.left - dims.margins.right;

			var data = scope.data;

			var yScale = d3.scale
						.linear()
						.range([dims.height,0])
						.domain([0,d3.max(data)])

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
				.data(data)
				.enter()
				.append("rect")
				.attr("class","bars")
				.attr("width",function(d){return dims.width/data.length-2;})
				.attr("height",function(d){return dims.height-yScale(d);})
				.attr("x",function(d,i){return dims.margins.left+(dims.width/data.length)*i;})
				.attr("y",function(d){return dims.margins.top+yScale(d);})
				}
				return {
					link: link,
					restrict: 'E',
					scope: {data: '='}
				}
			});

charts.directive("pieChart",function(){
	function link(scope, element, attr){
		var width = 500, height = 500;
		var pieces = scope.data;

		var pie = d3.layout.pie();
		var svg = d3.select(element[0])
			.append("svg").attr({width: width, height: height})
			.append("g")
			.attr("transform","translate("+width/2+","+height/2+")")
			;

		var colors = d3.scale.category20();
		var arc = d3.svg.arc().innerRadius(0).outerRadius(250);

		svg.selectAll("path").data(pie(pieces)).enter()
			.append("path")
			.attr({d: arc})
			.style({fill: function(d,i){ return colors(i); },
				stroke: "black"
				});
	}
	return {
		link: link,
		restrict: 'E',
		scope: {data: '='}
	}
});
