define(['app', 'StockService'], function (app, StockService) {
    app.controller('StockCtrl', function ($scope, $http, $rootScope, $filter, $timeout, StockService) {
    	
    	$scope.stockList = [];


        $scope.producto = {};

        var getProductos = StockService.getProductos();

        $scope.init = function() {
            $timeout(getProductos.then(function(stockList) {
                $scope.stockList = stockList;
            }), 1000);    
        }


    });
});