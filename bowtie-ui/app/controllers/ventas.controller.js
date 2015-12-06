define(['app', 'VentasService'], function (app, VentasService) {
    app.controller('VentasCtrl', function ($scope, $http, $rootScope, $timeout, $filter, VentasService) {

    	//Listas
        $scope.stockList = [];
        $scope.productosList = [];
        $scope.productosConCantidadList = [];
        $scope.medioPagoList = [];
        $scope.clientesList = [];
        $scope.promocionesList = [];
        /*************************************************************/
        //Helpers
        $scope.cantidadFilas = 10;
        $scope.totalVenta = 0;
        $scope.descuentoPromocion = 0;
        $scope.producto = {};
        /*************************************************************/
        //Cabecera de venta
        $scope.venta = {};
        $scope.venta.idVenta = 0;
        $scope.venta.idVendedor = 2;
        $scope.venta.idCliente = 1;
        $scope.venta.Fecha = Date.today();
        $scope.venta.Total = 0;
        $scope.venta.totalpromocion = 0;
        $scope.venta.NroTicket = 0;
        //Se inicializan en 1 para que los select tengan un valor por defecto
        $scope.venta.idMedioPago = 1;
        $scope.venta.idSucursal = 1;
        /*************************************************************/
        //Detalle de la venta
        $scope.venta.VentaDetalle = [];
        /*************************************************************/
        //Detalle de las promociones
        $scope.venta.VentaPromoDetalle = [];

        var getStock = VentasService.getStock();
        var getMedioPago = VentasService.getMedioPago();
        var getClientes = VentasService.getClientes();
        var getPromociones = VentasService.getPromociones();

        var getProductos = VentasService.getProductos();

        $scope.init = function() {
           getProductos.then(function(productosList) {
                getStock.then(function(stockList) {
                    for (var x in productosList) {
                        for (var i in stockList) {
                            if (productosList[x].idProducto === stockList[i].idProducto) {
                                productosList[x].stock = stockList[i].cantidad;
                            };
                        }   
                    }
                });
                $scope.productosList = productosList;
            });
             
            getMedioPago.then(function(medioPagoList) {
                $scope.medioPagoList = medioPagoList;
            });

            getClientes.then(function(clientesList) {
                $scope.clientesList = clientesList;
            });

            getPromociones.then(function(promocionesList) {
                $scope.promocionesList = promocionesList;
            });
        }

        $scope.saveVenta = function(venta) {
            $scope.venta.Total = $scope.totalVenta;
            //checkPromociones($scope.venta);
            //console.log(angular.toJson($scope.venta));
            VentasService.saveVenta(angular.toJson($scope.venta));

        }

        function checkPromociones(venta) {
            var promocionesCandidatas = [];
            var promocionesEjecutadas = [];

            for(var i in $scope.venta.VentaDetalle) {
                for(var x in $scope.promocionesList) {
                    for(var z in $scope.promocionesList[x].promoProducto){
                        if($scope.venta.VentaDetalle[i].idProducto ===  $scope.promocionesList[x].promoProducto[z].idProducto) {
                            promocionesCandidatas.push($scope.promocionesList[x]);

                            //$scope.venta.totalpromocion = $scope.promocionesList[x].precio * $scope.venta.VentaDetalle[i].cantidad;
                        }
                    }
                }
            }

            console.log(angular.toJson(promocionesCandidatas));
        }
        
        $scope.addProducto = function(producto) {
            
            var existe = addToList(producto);
            if (existe) {
                for(var i in $scope.venta.VentaDetalle) {
                    if ($scope.venta.VentaDetalle[i].idProducto === producto.idProducto) {
                        if (parseInt(producto.cantidad) > 1) {
                            $scope.venta.VentaDetalle[i].cantidad += parseInt(producto.cantidad);
                            if ($scope.venta.idMedioPago === 1) {
                                $scope.venta.VentaDetalle[i].PrecioFinal += producto.precioContado * parseInt(producto.cantidad);
                            } else if ($scope.venta.idMedioPago === 2 || $scope.venta.idMedioPago === 3) {
                                $scope.venta.VentaDetalle[i].PrecioFinal += producto.precioLista * parseInt(producto.cantidad);
                            };
                            if ($scope.totalVenta > 0) {
                                $scope.totalVenta += $scope.venta.VentaDetalle[i].PrecioUnitario * parseInt(producto.cantidad);
                            } else {
                                $scope.totalVenta = $scope.venta.VentaDetalle[i].PrecioUnitario * parseInt(producto.cantidad);
                            };
                        } else {
                            $scope.venta.VentaDetalle[i].cantidad += 1;
                            if ($scope.venta.idMedioPago === 1) {
                                $scope.venta.VentaDetalle[i].PrecioFinal += producto.precioContado;    
                            } else if ($scope.venta.idMedioPago === 2 || $scope.venta.idMedioPago === 3) {
                                $scope.venta.VentaDetalle[i].PrecioFinal += producto.precioLista * parseInt(producto.cantidad);
                            };
                            $scope.totalVenta += $scope.venta.VentaDetalle[i].PrecioUnitario;
                        }
                    };
                }
            };
        }


        function addToList(producto) {
            for(var i in $scope.venta.VentaDetalle) {
                if($scope.venta.VentaDetalle[i].idProducto === producto.idProducto) {
                    return true;    
                }
            }
            var ventaDetalle = {};
            ventaDetalle.descripcion = producto.nombre;
            ventaDetalle.idVenta = 0;
            ventaDetalle.idVentaDetalle = 0;
            ventaDetalle.idProducto = producto.idProducto;
            if ($scope.venta.idMedioPago === 1) {
                ventaDetalle.PrecioUnitario = producto.precioContado;    
            } else if ($scope.venta.idMedioPago ===2 || $scope.venta.idMedioPago ===3) {
                ventaDetalle.PrecioUnitario = producto.precioLista;
            };

            if(producto.cantidad === undefined) {
                producto.cantidad = 1;
            }
            ventaDetalle.cantidad = parseInt(producto.cantidad);
            ventaDetalle.Cantidad = parseInt(producto.cantidad);
            ventaDetalle.PrecioFinal = ventaDetalle.PrecioUnitario * producto.cantidad;
            ventaDetalle.Estado = "A";
            
            $scope.totalVenta += ventaDetalle.PrecioFinal;
            $scope.venta.VentaDetalle.push(ventaDetalle);
            
            return false;
        }

        $scope.removeProducto = function(obj) {
            $scope.venta.VentaDetalle.splice($scope.venta.VentaDetalle.indexOf(obj), 1);
            $scope.totalVenta -= obj.PrecioFinal;
        }

        function refreshVenta() {
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
            $scope.totalVenta = 0;
        }

        $( "#medioPago" ).change(function() {
            refreshVenta();
        });


    });
});