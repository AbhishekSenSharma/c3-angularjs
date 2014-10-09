/**
 * @name C3 angularjs directive
 * @desc Generic directive along with directives for commonly used charts
 */
var counter = Math.ceil((Math.random() * 1000));
(function(){
	angular.module('c3-angularjs', [])
		.directive('c3Chart', function() {
	        return {
	            restrict: "AE",
	            scope:{
	            	data: "@",
	            	axis: "@", 
	            	chartid: "@",
	            	color: "@", 
	            	size: "@",
	            	padding: "@",
	            	grid: "@",
	            },
	            template: "<div></div>",
	            link: function(scope, elem, attrs) {

	            	elem_dir= elem;
	            	attr_dir=attrs;
	            	scope_dir = scope;

	            	//set the id if given or add a random one
	            	if (scope.chartid){
	            		elem[0].childNodes[0].id = scope.chartid;
	            	}
	            	else{
	            		elem[0].childNodes[0].id = scope.chartid = 'c3'+counter;
	            		counter++;
	            	}

	            	axis = scope.axis || "{}"
	            	color = scope.color || "{}"
	            	size = scope.size || "{}"
	            	padding = scope.padding || "{}"
	            	grid = scope.grid || "{}"

	            	//generate the chart
	            	var chart = c3.generate({
	            	    bindto: '#'+scope.chartid,
	            	    data: JSON.parse(scope.data),
	            	    axis: JSON.parse(axis),
	            	    color: JSON.parse(color),
	            	    size: JSON.parse(size),   
	            	    padding: JSON.parse(padding),
	            	    grid: JSON.parse(grid)         	    
	            	});

	            	chart1 = chart;
	            	//console.log('chart', chart);

	            	//update 
	            	scope.$watch('data', function(newVal, oldVal) {
	            		if(newVal != oldVal){
		            		//console.log('in data watch', typeof(newVal), oldVal);
		            		chart.unload();
		            		chart.load(
		            			JSON.parse(newVal)
		            		);
		            	}
	            	});

	            },
	    };
	});
}());
