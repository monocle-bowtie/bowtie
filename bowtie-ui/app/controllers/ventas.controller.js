define(['app', 'VentasService'], function (app, VentasService) {
    app.controller('VentasCtrl', function ($scope, $http, $rootScope, $timeout, $filter, VentasService) {

    	$scope.productosList = [];
        $scope.productosVenta = [];

        $scope.movimientosList = [];
        $scope.movimientoListSave =[];

    	$scope.movimiento = {};
        $scope.movimiento.descripcion = "";
        $scope.movimiento.monto = "";

        $scope.producto = {};
        $scope.producto.Descripcion = "";
        $scope.producto.Venta = "";

        var getProductos = VentasService.getProductos();
        var guardarVenta = VentasService.guardarVenta();

        $timeout(getProductos.then(function(productosList) {
                $scope.productosList = productosList;
                $scope.$apply(); 
            }), 3000);
        
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

    	$scope.addMovimientoCaja = function(movimiento) {
            var data = {};
            data.descripcion = movimiento.descripcion;
            data.monto = movimiento.monto;
            $scope.movimientosList.push(data);
        }

        $scope.removeMovimientoCaja = function(obj) {
            if(obj != -1) {
                $scope.movimientosList.splice(obj, 1);
            }   
        }

        $scope.guardarVenta = function(productosVenta) {
            //Cuando este el backend aca va la llamada a VentasService
        }

        $scope.getTotalMovimientosCaja = function() {
            var totalMovimientosCaja = 0;
            for(var i=0; i<$scope.movimientosList.length; i++){
              totalMovimientosCaja = totalMovimientosCaja + parseInt($scope.movimientosList[i].monto);
            }
            return totalMovimientosCaja;
        }

        $scope.getTotalVenta = function() {
            var totalMovimientosCaja = 0;
            for(var i=0; i<$scope.productosVenta.length; i++){
              totalMovimientosCaja = totalMovimientosCaja + parseInt($scope.productosVenta[i].precio);
            }
            return totalMovimientosCaja;
        }

		//Si lo ponemos en el scope la funcion se llama de manera incorrecta.
        $("button").click(function() {
            $( "#movimiento-caja" ).slideToggle( "slow" );
        });
		    
    });
});