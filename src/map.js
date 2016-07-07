var app = angular.module("swedenMap",[]);

app.controller("MapController",function($scope){
	$scope.data = {};
});


app.directive("sverigesKommuner",function(){
	function link(scope,element,attr){


	var width = 500,
    height = 700;
    var scale = 1300;

        draw();

        function draw(sc){

        idToPrice = d3.map();

        var projection = d3.geo.mercator()
                                .center([15,63])
                                .scale(scale)
                                .translate([width/2,height/2])

            scale = scale + 100;
            var path = d3.geo.path().projection(projection);

            var svg = d3.select(element[0]).append("svg")
                        .attr("width", width)
                        .attr("height", height);

            d3.json("src/sverige.json", function(error, sverige) {
               svg.selectAll(".future")
                    .data(topojson.feature(sverige, sverige.objects.future).features)
                    .enter().append("path")
                    .attr("d", path);

                    svg.selectAll("path")
                    .on("mouseover",function(d,i){
                      //d3.select(this).style({fill: "gold","stroke-width": "2","stroke-dasharray": null});
                      //d3.selectAll("#title").text(d.properties.KNNAMN.toString()).attr("class","test");
                      d3.select(this).classed("highlighted",true);
                      scope.data.kommunNamn_hover = d.properties.KNNAMN.toString();
                      scope.$apply();
                    })
                    .on("click",function(d,i){
                      //console.log([d.properties.KNNAMN.toString()]);
                      //d3.selectAll("#kommun-namn").text(d.properties.KNNAMN.toString()).attr("class","test");
                      
                      scope.data.kommunNamn = d.properties.KNNAMN.toString();
                      scope.data.kommunKod = d.properties.KNKOD.toString();
                      scope.$apply();
                    })
                    .on("mouseout" ,function(d,i){d3.select(this).classed("highlighted",false)});
            
                    svg.selectAll("path")
                    .data(topojson.feature(sverige, sverige.objects.future).features)
                    .exit()
                    .remove();
            });
          }


	}

	return {
		link: link,
		restrict: 'E',
		scope: {data: '='}
	}
});
