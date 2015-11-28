define(['app', 'VentasService'], function (app, VentasService) {
    app.controller('VentasCtrl', function ($scope, $http, $rootScope, $timeout, $filter, VentasService) {

    	$scope.stockList = [];
        $scope.productosList = [];
        $scope.productosConCantidadList = [];
        $scope.medioPagoList = [];
        $scope.clientesList = [];

        $scope.cantidadFilas = 10;

        //Cabecera de venta
        $scope.venta = {};
        $scope.venta.idVenta = 0;
        $scope.venta.idVendedor = 2;
        $scope.venta.idCliente = 1;
        $scope.venta.Fecha = Date.today();
        $scope.venta.Total = 100;
        $scope.venta.totalpromocion = 20;
        $scope.venta.Estado = "A";
        $scope.venta.idMedioPago = 1;
        $scope.venta.idSucursal = 1;
        $scope.venta.NroTicket = "111";

        $scope.venta.VentaDetalle = [];
        $scope.venta.VentaPromoDetalle = [];

        $scope.producto = {};

        var getStock = VentasService.getStock();
        var getProductos = VentasService.getProductos();
        var getMedioPago = VentasService.getMedioPago();
        var getClientes = VentasService.getClientes();

        $scope.init = function() {
            $timeout(getStock.then(function(stockList) {
                $scope.stockList = stockList;
            }), 1000);

            $timeout(getProductos.then(function(productosList) {
                $scope.productosList = productosList;
            }), 1000);
            
            $timeout(getMedioPago.then(function(medioPagoList) {
                $scope.medioPagoList = medioPagoList;
            }), 1000);

            $timeout(getClientes.then(function(clientesList) {
                $scope.clientesList = clientesList;
            }), 1000); 
        }

        $scope.saveVenta = function(venta) {
            //console.log(angular.toJson($scope.venta));
            VentasService.saveVenta(angular.toJson($scope.venta));
        }
        
        $scope.addProducto = function(producto) {

            var ventaDetalle = {};
            ventaDetalle.descripcion = producto.nombre;
            ventaDetalle.idVenta = 0;
            ventaDetalle.idVentaDetalle = 0;
            ventaDetalle.idProducto = producto.idProducto;
            ventaDetalle.PrecioUnitario = producto.PrecioLista;

            if(producto.cantidad === undefined) {
                producto.cantidad = 1;
            }
            ventaDetalle.cantidad = producto.cantidad;
            
            ventaDetalle.Cantidad = producto.cantidad;
            ventaDetalle.PrecioFinal = producto.precioLista * producto.Cantidad;
            ventaDetalle.Estado = "A";

            $scope.venta.VentaDetalle.push(ventaDetalle);

        }

        $scope.removeProducto = function(obj) {
            if(obj != -1) {
                $scope.venta.VentaDetalle.splice(obj, 1);
            }
        }

        $scope.getTotalVenta = function() {
            /*var totalMovimientosCaja = 0;
            for(var i=0; i<$scope.productosVenta.length; i++){
              totalMovimientosCaja = totalMovimientosCaja + parseInt($scope.productosVenta[i].precio);
            }
            return totalMovimientosCaja;*/
        }

        $('#ver-detalle-venta').click(function() {
            $( "#detalle-venta" ).slideToggle( "slow" );
            $( "#detalle-productos" ).slideToggle( "slow" );
            $( "#ver-detalle-venta" ).hide( "slow" );
            $( "#ver-detalle-productos" ).show( "slow" );
        });

        $('#ver-detalle-productos').click(function() {
            $( "#detalle-venta" ).slideToggle( "slow" );
            $( "#detalle-productos" ).slideToggle( "slow" );
            $( "#ver-detalle-productos" ).hide( "slow" );
            $( "#ver-detalle-venta" ).show( "slow" );
        });
		    
    });
});