define(['app', 'ProveedoresService'], function (app, ProveedoresService) {
    app.controller('ProveedoresCtrl', function ($scope, $http, $rootScope, $filter, $timeout, ProveedoresService) {
    	
    	$scope.proveedoresList = [];

    	$scope.proveedor = {};
        $scope.proveedor.nombre = "";
        $scope.proveedor.email = "";
        $scope.proveedor.telefono = "";
        $scope.proveedor.notas = "";
        
         var getProveedores = ProveedoresService.getProveedores();

         $timeout(getProveedores.then(function(proveedoresList) {
                $scope.proveedoresList = proveedoresList;
                $scope.$apply(); 
            }), 3000);

         $scope.addProveedor = function(proveedor) {
            var data = {};
            data.nombre = proveedor.nombre;
            data.email = proveedor.email;
            data.telefono = proveedor.telefono;
            data.notas = proveedor.notas;
            $scope.proveedoresList.push(data);
            clearProveedor();
        }


        function clearProveedor() {
            $scope.proveedor = {};
            $scope.proveedor.nombre = "";
            $scope.proveedor.email = "";
            $scope.proveedor.telefono = "";
            $scope.proveedor.notas = "";
        }

    });
});