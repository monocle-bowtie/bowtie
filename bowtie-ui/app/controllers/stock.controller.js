define(['app', 'StockService'], function (app, StockService) {
    app.controller('StockCtrl', function ($scope, $http, $rootScope, $filter, $timeout, StockService) {
    	
    	$scope.productosList = [];

        $scope.producto = {};
        $scope.producto.Descripcion = "";
        $scope.producto.Venta = "";

        var getProductos = StockService.getProductos();

        $timeout(getProductos.then(function(productosList) {
                $scope.productosList = productosList;
                $scope.$apply(); 
            }), 3000);

    });
});