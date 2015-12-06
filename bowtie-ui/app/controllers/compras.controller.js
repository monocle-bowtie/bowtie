define(['app', 'ComprasService', 'AutocompleteDirective', 'ProductoModel'], function (app, ComprasService, AutocompleteDirective, ProductoModel) {
    app.controller('ComprasCtrl', function ($scope, $http, $rootScope, $filter, $timeout, ComprasService, ProductoModel) {

        $scope.productosList = [];
        $scope.proveedoresList = [];
        $scope.medioPagoList = [];
        $scope.gruposList = [];

        $scope.producto = new ProductoModel();
        $scope.productos = { autocomplete: [] };

        $scope.compra = {};
        $scope.compra.idCompra = 0;
        $scope.compra.idProveedor = 0;
        $scope.compra.idGrupo = 0;
        $scope.compra.Fecha = "";
        $scope.compra.Total = 0;
        $scope.compra.Estado = "A";
        $scope.compra.idMedioPago = 0;
        $scope.compra.NroFactura = "";
        $scope.compra.CompraDetalle = [];

        var getProveedores = ComprasService.getProveedores();
        var getProductos = ComprasService.getProductos();
        var getMedioPago = ComprasService.getMedioPago();
        var getCategorias = ComprasService.getCategorias();

        $scope.init = function() {
            $timeout(getProveedores.then(function(proveedoresList) {
                $scope.proveedoresList = proveedoresList;
            }), 1000);

            $timeout(getProductos.then(function(productosList) {
                $scope.productosList = productosList;
                for (i = 0; i < productosList.length; i++){
                    $scope.productos.autocomplete.push(productosList[i].nombre);
                }
            }), 1000);

            $timeout(getMedioPago.then(function(medioPagoList) {
                $scope.medioPagoList = medioPagoList;
            }), 1000);

            $timeout(getCategorias.then(function(gruposList) {
                $scope.gruposList = gruposList;
            }), 1000);
        }

        $scope.saveCompra = function() {
            for(var i in  $scope.compra.CompraDetalle) {
                 $scope.compra.Total += $scope.compra.CompraDetalle[i].PrecioTotal;
            }
            ComprasService.saveCompra(angular.toJson($scope.compra));
            //console.log(angular.toJson($scope.compra));
        }

        $scope.addProducto = function(prod) {
            var existe = createProductoExistente(prod);
            if (!existe) {
                createProductoNuevo(prod);
            };
            $scope.producto.clearProducto();
        }

        function createProductoNuevo(prod) {
            var compraDetalle = {};
            compraDetalle.idCompra = 0;
            compraDetalle.idCompraDetalle = 0;
            compraDetalle.idProducto = 0;
            compraDetalle.NombreProducto = prod.NombreProducto;
            compraDetalle.Cantidad = parseInt(prod.cantidad);
            compraDetalle.PrecioUnitario = parseInt(prod.costo);
            compraDetalle.PrecioTotal = prod.costo * prod.cantidad;
            compraDetalle.CodigoBarras = prod.Codigo;
            $scope.compra.CompraDetalle.push(compraDetalle);
        }

        function createProductoExistente(prod) {
            for (var i = 0; i < $scope.productosList.length; i++) {
                if($scope.productosList[i].nombre === prod.NombreProducto) {
                    var compraDetalle = {};
                    compraDetalle.idCompra = 0;
                    compraDetalle.idCompraDetalle = 0;
                    compraDetalle.idProducto = $scope.productosList[i].idProducto;
                    compraDetalle.NombreProducto = prod.NombreProducto;
                    compraDetalle.Cantidad = parseInt(prod.cantidad);
                    compraDetalle.PrecioUnitario = parseInt(prod.costo);
                    compraDetalle.PrecioTotal = prod.costo * prod.cantidad;
                    $scope.compra.CompraDetalle.push(compraDetalle);
                    return true;
                } 
            };
            return false;
        }

        $scope.remove = function(obj) {
            if(obj != -1) {
                $scope.compra.CompraDetalle.splice(obj, 1);
            }
        }
       
        $('#ver-detalle-compras').click(function() {
            $( "#detalle-compra" ).slideToggle( "slow" );
        });

        $('#fecha').datepicker({
            format: "mm/dd/yyyy"
        });
		    
    });
});