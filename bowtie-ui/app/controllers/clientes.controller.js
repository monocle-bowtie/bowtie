define(['app', 'ClientesService', 'ClienteModel'], function (app, ClientesService, ClienteModel) {
    app.controller('ClientesCtrl', function ($scope, $http, $rootScope, $filter, $timeout, ClientesService, ClienteModel) {
    	
    	$scope.clientesList = [];

        $scope.cliente = new ClienteModel();

        var getClientes = ClientesService.getClientes();

        $timeout(getClientes.then(function(clientesList) {
                $scope.clientesList = clientesList;
                //$scope.$apply();       
        }), 3000);

       

         $scope.addCliente = function(cliente) {
            var data = {};
            data.nombre = cliente.nombre;
            data.email = cliente.email;
            data.telefono = cliente.telefono;
            data.notas = cliente.notas;

            $scope.clientesList.push(data);
            $scope.cliente.clearCliente();
            //clearCliente();
        }

        // Retorna un string con el json de los clientes.
        function jsonClientes()
        {
            return angular.toJson($scope.clientesList);
        }

    });
});