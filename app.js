var app = angular.module('myApp', [])
    .controller('GridController', GridController)
    .directive('hexgrid', hexGrid);

function GridController($scope) {
    var dupa = function() {
        console.log('dupa');
    },
        vm = this;

    vm.dupa = dupa;

    $scope.grzyb = 15;

    $scope.hexPositions = [
        {position: 1},
        {position: 2},
        {position: 3}
    ];
};

GridController.$inject = ['$scope'];

var d3Translate = function(x, y) {
        return 'translate(' + x + ', ' + y + ')';
    },


    hexGrid = function() {
        return {
            restrict: 'E',
            // templateUrl: "hex-visualization.html",
            template: "<svg width=500 height=500 class='container'></svg>",
            controller: GridController,
            controllerAs: 'vm',
            link: link,
            scope: {
                data: '=',
                width: '=',
                height: '='
            }
        };

    function link(scope, element, attributes) {
        var pos = attributes.position * 0.9 * 60;
        d3.select('.container')
            .append("path")
            .attr('transform', d3Translate(pos, 30))
            .attr('class', 'hex')
            .attr({
                d: d3.hexbin().hexagon(30),
                "stroke": "#111111",
                'stroke-width': 2,
                "fill": "#533333"
            });
        };
    };