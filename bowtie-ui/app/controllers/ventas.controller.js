define(['app', 'VentasService'], function (app, VentasService) {
    app.controller('VentasCtrl', function ($scope, $http, $rootScope, $timeout, $filter, VentasService) {

    	$scope.productosList = [];
        $scope.productosVenta = [];

        $scope.producto = {};
        $scope.producto.Descripcion = "";
        $scope.producto.Venta = "";

        var getProductos = VentasService.getProductos();
        var guardarVenta = VentasService.guardarVenta();

        $scope.init = function() {
            $timeout(getProductos.then(function(productosList) {
                $scope.productosList = productosList;
            }), 1000);
        }
        
        
        $scope.addProducto = function(producto){
            var data = {};
            data.nombre = producto.nombre;
            data.precio = producto.precio;
            $scope.productosVenta.push(data);
        }

        $scope.removeProducto = function(obj) {
            if(obj != -1) {
                $scope.productosVenta.splice(obj, 1);
            }
        }

        $scope.guardarVenta = function(productosVenta) {
            //Cuando este el backend aca va la llamada a VentasService
        }

        $scope.getTotalVenta = function() {
            var totalMovimientosCaja = 0;
            for(var i=0; i<$scope.productosVenta.length; i++){
              totalMovimientosCaja = totalMovimientosCaja + parseInt($scope.productosVenta[i].precio);
            }
            return totalMovimientosCaja;
        }
		    
    });
});