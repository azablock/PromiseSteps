var app = angular.module('chartApp', []);

app.controller('SalesController', ['$scope', function ($scope) {
    $scope.salesData = [
        {hour: 1, sales: 54},
        {hour: 2, sales: 66},
        {hour: 3, sales: 77},
        {hour: 4, sales: 70},
        {hour: 5, sales: 60},
        {hour: 6, sales: 63},
        {hour: 7, sales: 55},
        {hour: 8, sales: 47},
        {hour: 9, sales: 55},
        {hour: 10, sales: 30}
    ];
}]);

app.directive('linearChart', function () {

    return {
        restrict: 'EA',
        template: "<svg width='800' height='600'></svg>",
        link: function (scope, elem, attrs) {
            var salesDataToPlot = scope[attrs.chartData];
            var padding = 20;
            var xScale, yScale, xAxisGen, yAxisGen, lineFun;

            var rawSvg = elem.find("svg")[0];
            var svg = d3.select(rawSvg);

            function setChartParameters(){
                xScale = d3.scale.linear()
                    .domain([salesDataToPlot[0].hour, salesDataToPlot[salesDataToPlot.length - 1].hour])
                    .range([padding + 5, rawSvg.clientWidth - padding]);

                yScale = d3.scale.linear()
                    .domain([0, d3.max(salesDataToPlot, function (d) {
                        return d.sales;
                    })])
                    .range([rawSvg.clientHeight - padding, 0]);

                xAxisGen = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom")
                    .ticks(salesDataToPlot.length - 1);

                yAxisGen = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(5);

                lineFun = d3.svg.line()
                    .x(function (d) {
                        return xScale(d.hour);
                    })
                    .y(function (d) {
                        return yScale(d.sales);
                    })
                    .interpolate("basis");
            }

            function drawLineChart() {

                setChartParameters();

                svg.append("svg:g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(10, 180)")
                    .call(xAxisGen);

                svg.append("svg:g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(30, 0)")
                    .call(yAxisGen);

                svg.append("svg:path")
                    .attr('transform', 'translate(10, 0)')
                    .attr({
                        d: lineFun(salesDataToPlot),
                        "stroke": "white",
                        "fill": "none"
                    });
            }

            drawLineChart();
        }
    };
});


